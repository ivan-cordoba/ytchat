import React from 'react';
import YouTube from 'react-youtube';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.options = {
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        modestbranding: 1,
        showinfo: 0,
        playsinline: 1,
        fs: 0,
      },
    };
    this.state = {
      done: false,
    };
    this.playVideo = this.playVideo.bind(this);
    this.endVideo = this.endVideo.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
  }

  playVideo(event) {
    event.target.playVideo();
  }
  
  endVideo() {
    this.setState({
      done: true,
    });
  }

  renderVideo() {
    if (this.state.done) {
      return (
        <div>
          Next Video Will Play Shortly
        </div>
      );
    }
    return (
      <YouTube
        videoId="2g811Eo7K8U"
        opts={this.options}
        onPause={this.playVideo}
        onEnd={this.endVideo}
      />
    );
  }

  render() {
    return this.renderVideo();
  }
}
