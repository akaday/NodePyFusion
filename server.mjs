import express from 'express';
import { exec } from 'child_process';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3001; // Changed port

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/nodepyfusion', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model
const dataSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now }
});
const Data = mongoose.model('Data', dataSchema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  setInterval(() => {
    exec('python script.py', async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      const data = JSON.parse(stdout);
      const newData = new Data(data);
      await newData.save();
      socket.emit('data', stdout);
    });
  }, 5000); // Fetch data every 5 seconds
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
