import React from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-width: 600px;
`;

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.options = {
      playerVars: {
        autoplay: 1,
        controls: 1,
        disablekb: 1,
        modestbranding: 1,
        showinfo: 0,
        playsinline: 1,
        fs: 0,
        start: 0,
        width: '100%',
      },
    };
    this.state = {
      done: false,
    };
    this.player = null;
    this.playVideo = this.playVideo.bind(this);
    this.endVideo = this.endVideo.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
    this.assignPlayer = this.assignPlayer.bind(this);
    this.syncTime = this.syncTime.bind(this);
  }

  componentDidUpdate() {
    this.syncTime();
  }

  syncTime() {
    const time = Math.floor(((new Date()) - (new Date(this.props.videoTime))) / 1000);
    this.player.seekTo(time, true);
  }

  assignPlayer(event) {
    this.player = event.target;
    this.syncTime();
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
    if (this.state.done || this.props.videoID === '') {
      return (
        <Container>
          Next Video Will Play Shortly
        </Container>
      );
    }
    return (
      <YouTube
        videoId={this.props.videoID}
        opts={this.options}
        onPause={this.playVideo}
        onReady={this.assignPlayer}
      />
    );
  }

  render() {
    return this.renderVideo();
  }
}
