const axios = require('axios');

const key = process.env.KEY;
const q = '';

const getVideos = () =>
  axios
    .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${q}&key=${key}`);

const getVideoInfo = () =>
  axios
    .get('');

module.exports = {
  getVideos,
  getVideoInfo,
};
