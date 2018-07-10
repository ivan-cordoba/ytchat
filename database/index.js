const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@ds018498.mlab.com:18498/ytchat`, { useNewUrlParser: true });

const videoSchema = new mongoose.Schema({}, { strict: false });

const Video = mongoose.model('Video', videoSchema);

const clearDB = () =>
  Video.remove({}, () => {});

const insertVideos = videos =>
  Video.collection.insert(videos);

const getCount = () =>
  Video.count();

const getVideos = () =>
  new Promise((resolve, reject) => {
    Video.find({}, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

module.exports = {
  getVideos,
  insertVideos,
};
