import React from 'react';
import uuid from 'uuid/v4';
import faker from 'faker';
import Message from './Message.jsx';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 440px;
  justify-content: space-around;
  box-shadow: 0px 0px 2px 2px grey;
  margin-top: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 5%;
  width: 100%;
`;

const Messages = styled.div`
  flex-grow: 2;
  width: 80%;
  height: 400px;
  overflow: scroll;
  box-shadow: 0 0 1px 1px inset;
  background-color: white;
  padding: 10px;
  margin: 5%;
`;

const Username = styled.div`
  text-align: center;
  padding: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  margin: 5%;
  height: 50px;
  resize: none;
`;

const Button = styled.div`
  background-color: red;
  color: white;
  font-size: 15px;
  width: 50px;
  text-align: center;
  border-radius: 1px;
  padding: 5px;
  margin: 10px 0 10px 0;
  :hover {
    box-shadow: 0 0 1px 1px grey;
  }
`;

const Title = styled.div`
  margin: 0;
  width: 100%;
  font-size: 20px;
  padding: 10px;
  text-align: center;
  background-color: red;
  color: white;
`;

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      inputText: '',
    };
    this.username = `${faker.commerce.productAdjective()} ${faker.name.firstName()}`;
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
      });
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
      <Container>
        <Title>
          Join the Chat
        </Title>
        <Username>
          You are {this.username}
        </Username>
        <TextArea
          value={this.state.inputText}
          onKeyUp={this.handleMessageSubmitEnter}
          onChange={this.handleInputChange}
          placeholder="Enter Message Here..."
        />
        <ButtonContainer>
          <Button
            onClick={this.handleMessageSubmit}
          >
            Send
          </Button>
        </ButtonContainer>
        <Messages>
          {
            this.state.messages.map(msg => <Message msg={msg} key={uuid()} />)
          }
        </Messages>
      </Container>
    );
  }
}
