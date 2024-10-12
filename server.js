const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.get('/data', (req, res) => {
  exec('python script.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      res.status(500).send('Error executing Python script');
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      res.status(500).send('Error in Python script');
      return;
    }
    res.send(`Data from Python: ${stdout}`);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
