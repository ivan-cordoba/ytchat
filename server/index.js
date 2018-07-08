const express = require('express');
const morgan = require('morgan');
const path = require('path');
const socket = require('socket.io');
const http = require('http');
const xss = require('xss');
const { getRandomVideo, addVideo } = require('./helpers/videoSelector');

const app = express();
const httpServer = http.Server(app);
const io = socket(httpServer);
const port = process.env.PORT || 4000;

const timeToNextVideo = 60000;
let currentVideo = null;
let videoA = null;
let videoB = null;
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
  socket.on('poll answer', (answer) => {
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
  if (videoA === null) {
    videoA = getRandomVideo();
  }
  if (videoB === null) {
    videoB = getRandomVideo();
  }
  if (currentVideo === null) {
    currentVideo = getRandomVideo();
  } else if (pollTallyB > pollTallyA) {
    console.log('picked b');
    currentVideo = videoB;
    addVideo(videoA);
    videoB = getRandomVideo();
  } else {
    console.log('picked a');
    currentVideo = videoA;
    addVideo(videoB);
    videoA = getRandomVideo();
  }
  pollTallyA = 0;
  pollTallyB = 0;
  io.emit('tally', [pollTallyA, pollTallyB]);
  io.emit('video', currentVideo);
  io.emit('poll', 'stuff');
  console.log('video update sent');
}, timeToNextVideo);
