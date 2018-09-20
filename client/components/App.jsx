import React from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';

import Header from './Header.jsx';
import Player from './Player.jsx';
import Chat from './Chat.jsx';
import Poll from './Poll.jsx';
import AudienceCounter from './AudienceCounter.jsx';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  font-family: sans-serif;
  padding: 20px;
`;

const VideoContainer = styled.div`

`;

const SideBar = styled.div`
  margin-top: 50px;
  width: 450px;
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io();
    this.state = {
      videoID: '',
      videoTime: null,
    };
    this.updateVideo = this.updateVideo.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
  }

  componentDidMount() {
    this.socket.on('video', this.updateVideo);
  }

  updateVideo(newVideoID) {
    console.log(newVideoID);
    this.setState({
      videoID: newVideoID[0],
      videoTime: newVideoID[1],
    });
  }

  renderPlayer() {
    if (this.state.videoTime !== null) {
      return <Player videoID={this.state.videoID} videoTime={this.state.videoTime} />;
    }
    return null;
  }

  render() {
    return (
      <Container>
        <Header />
        <VideoContainer>
          <AudienceCounter
            socket={this.socket}
          />
          {this.renderPlayer()}
        </VideoContainer>
        <SideBar>
          <Poll
            socket={this.socket}
          />
          <Chat
            socket={this.socket}
          />
        </SideBar>
      </Container>
    );
  }
}
