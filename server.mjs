<<<<<<< HEAD
import json

def process_data():
    data = {"message": "Hello from Python with data processing!"}
    return json.dumps(data)

if __name__ == "__main__":
    print(process_data())
=======
import express from 'express';
import { exec } from 'child_process';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  setInterval(() => {
    exec('python script.py', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      socket.emit('data', stdout);
    });
  }, 5000); // Fetch data every 5 seconds
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
>>>>>>> 3dfd5e325aa5f6619a38eb6955197339158055aa
