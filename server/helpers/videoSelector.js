const Promise = require('bluebird');
const { getVideos } = require('../../database/index');
const { getVideoLength } = require('./youtube');

let videos;

const initializeVideos = () =>
  new Promise((resolve, reject) => {
    getVideos()
      .then((res) => {
        videos = res;
        console.log('Videos', videos.length);
        resolve();
      });
  });

const getRandomVideo = () => {
  const index = Math.floor(Math.random() * videos.length);
  const video = JSON.parse(JSON.stringify(videos[index]));

  return new Promise((resolve, reject) => {
    getVideoLength(video.id.videoId)
      .then((res) => {
        video.duration = 9000;
        resolve(video);
      });
  });
};

const addVideo = (video) => {
  videos.push(video);
};

module.exports = {
  getRandomVideo,
  addVideo,
  initializeVideos,
};
