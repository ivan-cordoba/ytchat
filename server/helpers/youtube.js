const axios = require('axios');
const Promise = require('bluebird');

const key = process.env.KEY;
const q = '';

const arrToNum = (arr) => {
  const strNum = arr.join('');
  return parseInt(strNum, 10);
};

const convertTime = (isoTime) => {
  //PT21M3S
  const isoTimeArr = isoTime.toLowerCase().substring(2).split('');
  let timeSlice = [];
  let msTime = 0;
  for (let i = 0; i < isoTimeArr.length; i += 1) {
    const currNum = parseInt(isoTimeArr[i], 10);
    if (!isNaN(currNum)) {
      timeSlice.push(currNum);
    } else if (isoTimeArr[i] === 'h') {
      const hours = arrToNum(timeSlice);
      timeSlice = [];
      msTime += hours * 60000 * 60;
    } else if (isoTimeArr[i] === 'm') {
      const minutes = arrToNum(timeSlice);
      timeSlice = [];
      msTime += minutes * 60000;
    } else if (isoTimeArr[i] === 's') {
      const seconds = arrToNum(timeSlice);
      timeSlice = [];
      msTime += seconds * 1000;
    }
  }
  return msTime;
};

const getVideos = () =>
  axios
    .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${q}&key=${key}`);

const getVideoLength = videoId =>
  axios
    .get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${key}`)
    .then(res =>
      new Promise((resolve, reject) => {
        return resolve(convertTime(res.data.items[0].contentDetails.duration));
      }));

module.exports = {
  getVideos,
  getVideoLength,
};
