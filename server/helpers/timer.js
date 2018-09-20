
const timer = (startTime, duration, callback) => {
  const interval = setInterval(() => {
    const currTime = new Date();
    if (currTime - startTime >= duration) {
      callback();
      console.log(currTime - startTime);
      clearInterval(interval);
    }
  }, 30);
};

module.exports = timer;
