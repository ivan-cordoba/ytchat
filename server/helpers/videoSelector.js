const { getVideos } = require('../../database/index');
// const { getVideoInfo } = require('./youtube');
// const Promise = require('bluebird');

let videos;

getVideos()
  .then((res) => {
    videos = res;
  });

const getRandomVideo = () => {
  if (videos.length === 0) {
    return '';
  }
  const index = Math.floor(Math.random() * videos.length);
  const video = videos[index];
  videos.splice(index, 1);
  return video;
};

const addVideo = (video) => {
  videos.push(video);
};

module.exports = {
  getRandomVideo,
  addVideo,
};
