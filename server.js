const express = require('express');
const { exec } = require('child_process');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
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

http.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
