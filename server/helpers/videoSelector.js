const Promise = require('bluebird');
// const { getVideos } = require('../../database/index');
const { getVideoLength, getVideos } = require('./youtube');

let videos;

const initializeVideos = () =>
  new Promise((resolve, reject) => {
    getVideos()
      .then((res) => {
        videos = res.data.items;
        if (videos.length === 0) reject();
        resolve();
      });
  });

const getRandomVideo = () => {
  let index = Math.floor(Math.random() * videos.length);
  if (index === 0) index += 1;
  const video = JSON.parse(JSON.stringify(videos[index]));

  return new Promise((resolve, reject) => {
    getVideoLength(video.snippet.resourceId.videoId)
      .then((res) => {
        video.duration = res;
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
