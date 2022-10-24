const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static('public'));

let count = 0;

io.on('connection', (socket) => {
  count++;
  io.emit('count', count);
  socket.on('disconnect', (reason) => {
    count--;
    io.emit('count', count);
  });
});

http.listen(port, () => {
  console.log(`leaving-website server running at http://localhost:${port}/`);
});
