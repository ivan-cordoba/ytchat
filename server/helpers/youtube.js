const axios = require('axios');

const key = 'AIzaSyAIiEWcJJzK1MPKCEtMk0YGwuaLn83oqpM';
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
