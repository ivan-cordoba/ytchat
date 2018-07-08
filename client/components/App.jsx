import React from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';

import Player from './Player.jsx'
import Chat from './Chat.jsx';
import Poll from './Poll.jsx';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

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
    console.log(newVideoID);
    this.setState({
      videoID: newVideoID,
    });
  }

  render() {
    return (
      <Container>
        <div>
          <Player videoID={this.state.videoID} />
        </div>
        <div>
          <Poll socket={this.socket} />
          <Chat socket={this.socket} />
        </div>
      </Container>
    );
  }
}
