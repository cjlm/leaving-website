const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  io.emit('count', io.engine.clientsCount);
  socket.on('disconnect', (reason) => {
    io.emit('count', io.engine.clientsCount);
  });
});

http.listen(port, () => {
  console.log(`leaving-website server running at http://localhost:${port}/`);
});
