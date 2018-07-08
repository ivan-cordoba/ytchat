let videos = [
  'IUN0lDk0CcA',
  'sb5JfVi5bZY',
  'h9yqifJ3AIQ',
  'E6cPPmcfKao',
];

const getRandomVideo = () => {
  if (videos.length === 0) {
    return '';
  }
  const index = Math.floor(Math.random() * videos.length);
  const video = videos[index];
  videos.splice(index, 1);
  return video;
};

module.exports = {
  getRandomVideo,
};
