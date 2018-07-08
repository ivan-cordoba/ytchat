import React from 'react';
import io from 'socket.io-client';

import Player from './Player.jsx'
import Chat from './Chat.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io();
    this.state = {
      videoID: '',
    };
    this.updateVideo = this.updateVideo.bind(this);
  }

  componentDidMount() {
    this.socket.on('video', this.updateVideo);
  }

  updateVideo(newVideoID) {
    this.setState({
      videoID: newVideoID,
    });
  }

  render() {
    return(
      <div>
        <Player videoID={this.state.videoID} />
        <Chat socket={this.socket} />
      </div>
    );
  }
}
