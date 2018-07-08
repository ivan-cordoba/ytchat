import React from 'react';
import uuid from 'uuid/v4';
import Message from './Message.jsx';
import styled from 'styled-components';

const Messages = styled.div`
  width: 25vw;
  height: 50vh;
  overflow: scroll;
  background-color: grey;
`;

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      inputText: '',
    };
    this.username = 'anonymous';
    this.addMessage = this.addMessage.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.handleMessageSubmitEnter = this.handleMessageSubmitEnter.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('msg', this.addMessage);
  }

  addMessage(msg) {
    const newMessages = this.state.messages;
    newMessages.unshift(msg);
    this.setState({
      messages: newMessages,
    });
  }

  handleInputChange(event) {
    this.setState({
      inputText: event.target.value,
    });
  }

  handleMessageSubmit() {
    if (this.inputText !== '') {
      this.props.socket.emit('msg', {
        text: this.state.inputText,
        username: this.username,
      })
      this.setState({
        inputText: '',
      });
    }
  }

  handleMessageSubmitEnter(event) {
    if (event.key === 'Enter') {
      this.handleMessageSubmit();
    }
  }

  render() {
    return (
      <div>
        <input
          value={this.state.inputText}
          onChange={this.handleInputChange}
          onKeyPress={this.handleMessageSubmitEnter}
        />
        <button
          onClick={this.handleMessageSubmit}
        >
          Submit
        </button>
        <Messages>
          {
            this.state.messages.map(msg => <Message msg={msg} key={uuid()} />)
          }
        </Messages>
      </div>
    );
  }
}
