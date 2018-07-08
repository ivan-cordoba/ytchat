const axios = require('axios');

const key = process.env.KEY;
const part = 'snippet';
const q = '';

const getVideos = () =>
  axios
    .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${q}&key=${key}`);


module.exports = {
  getVideos,
};

getVideos()
  .then((res) => {
    console.log(JSON.stringify(res.data.items[0]));
  })
  .catch(err => console.error(err));
