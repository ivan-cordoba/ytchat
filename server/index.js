const express = require('express');
const morgan = require('morgan');
const path = require('path');
const socket = require('socket.io');
const http = require('http');
const xss = require('xss');
const { getRandomVideo } = require('./helpers/videoSelector');

const app = express();
const httpServer = http.Server(app);
const io = socket(httpServer);
const port = process.env.PORT || 4000;

const timeToNextVideo = 60000;
let pollTallyA = 0;
let pollTallyB = 0;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  socket.on('msg', (msg) => {
    io.emit('msg', {
      text: xss(msg.text),
      username: msg.username,
    });
  });
  socket.on('poll', (answer) => {
    if (answer === 'a') {
      pollTallyA += 1;
    } else if (answer === 'b') {
      pollTallyB += 1;
    }
    io.emit('tally', [pollTallyA, pollTallyB]);
  });
});

httpServer.listen(port, () => {
  console.log(`listening on port ${port}`);
});

setInterval(() => {
  console.log('video update sent');
  pollTallyA = 0;
  pollTallyB = 0;
  io.emit('tally', [pollTallyA, pollTallyB]);
  io.emit('video', getRandomVideo());
  io.emit('poll', 'stuff');
}, timeToNextVideo);
