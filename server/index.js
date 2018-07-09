const express = require('express');
const morgan = require('morgan');
const path = require('path');
const socket = require('socket.io');
const http = require('http');
const xss = require('xss');
const { getRandomVideo, initializeVideos } = require('./helpers/videoSelector');

const app = express();
const httpServer = http.Server(app);
const io = socket(httpServer);
const port = process.env.PORT || 4000;

let currentVideo = null;
let videoA = null;
let videoB = null;
let videoANext = null;
let videoBNext = null;
let pollTallyA = 0;
let pollTallyB = 0;
let videoTimer = 0;
let audienceCount = 0;
let videoTimerInterval;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  audienceCount += 1;
  io.emit('audience update', audienceCount);
  socket.emit('poll', 'stuff');
  socket.emit('poll choices', [videoANext, videoBNext]);
  socket.emit('tally', [pollTallyA, pollTallyB]);
  socket.emit('video', [currentVideo.id.videoId, videoTimer]);
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
  socket.on('disconnect', () => {
    audienceCount -= 1;
    io.emit('audience update', audienceCount);
  });
});

const queueUpVideos = () => {
  videoA = videoANext;
  videoB = videoBNext;
  getRandomVideo()
    .then((res) => {
      videoANext = res;
      return getRandomVideo();
    })
    .then((res) => {
      videoBNext = res;
    });
};

const startTimer = () => {
  videoTimer = 0;
  videoTimerInterval = setInterval(() => {
    videoTimer += 1;
  }, 1000);
};

const updateVideo = () => {
  console.log('Sending new video...');
  if (pollTallyB > pollTallyA) {
    currentVideo = videoB;
  } else {
    currentVideo = videoA;
  }
  pollTallyA = 0;
  pollTallyB = 0;
  io.emit('poll choices', [videoANext, videoBNext]);
  io.emit('tally', [pollTallyA, pollTallyB]);
  io.emit('video', [currentVideo.id.videoId, 0]);
  io.emit('poll', 'stuff');
  setTimeout(updateVideo, currentVideo.duration + 5000);
  clearInterval(videoTimerInterval);
  startTimer();
  console.log('Minutes to Next Video: ', currentVideo.duration / 60000);
  queueUpVideos();
};

initializeVideos()
  .then(() => getRandomVideo())
  .then((res) => {
    videoA = res;
    return getRandomVideo();
  })
  .then((res) => {
    videoB = res;
    return getRandomVideo();
  })
  .then((res) => {
    videoANext = res;
    return getRandomVideo();
  })
  .then((res) => {
    videoBNext = res;
    updateVideo();
    httpServer.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
