import React from 'react';
import styled from 'styled-components';
import Preview from './Preview.jsx';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 440px;
  justify-content: space-around;
  box-shadow: 0px 0px 2px 2px grey;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.div`
  background-color: red;
  color: white;
  font-size: 12px;
  width: 50px;
  text-align: center;
  border-radius: 1px;
  padding: 5px;
  margin: 10px 0 10px 0;
  :hover {
    box-shadow: 0 0 1px 1px grey;
  }
`;

const PreviewContainer = styled.div`
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

const Votes = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
`;

export default class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPoll: false,
      answeredPoll: false,
      tallyA: 0,
      tallyB: 0,
      choiceA: null,
      choiceB: null,
    };
    this.answerPoll = this.answerPoll.bind(this);
    this.startPoll = this.startPoll.bind(this);
    this.updateTally = this.updateTally.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('poll', this.startPoll);
    this.props.socket.on('tally', this.updateTally);
  }

  startPoll(data) {
    this.setState({
      showPoll: true,
      answeredPoll: false,
      tallyA: data.tallyA,
      tallyB: data.tallyB,
      choiceA: data.choiceA,
      choiceB: data.choiceB,
    });
  }

  answerPoll(choice) {
    if (this.state.answeredPoll) {
      return;
    }
    this.setState({
      answeredPoll: true,
    });
    this.props.socket.emit('poll answer', choice);
  }

  updateTally(tally) {
    this.setState({
      tallyA: tally[0],
      tallyB: tally[1],
    });
  }

  renderPreview() {
    if (this.state.choiceA && this.state.choiceB) {
      return (
        <Container>
          <Title>
            Vote For Next Video!
          </Title>
          <PreviewContainer>
            <Votes>
              {this.state.tallyA} Votes
            </Votes>
            <Preview
              url={this.state.choiceA.snippet.thumbnails.default.url}
            />
            <ButtonContainer>
              <Button
                onClick={() => {
                  this.answerPoll('a');
                }}
                disabled={this.state.answeredPoll}
              >
                Vote
              </Button>
            </ButtonContainer>
          </PreviewContainer>
          <PreviewContainer>
            <Votes>
              {this.state.tallyB} Votes
            </Votes>
            <Preview
              url={this.state.choiceB.snippet.thumbnails.default.url}
            />
            <ButtonContainer>
              <Button
                onClick={() => {
                  this.answerPoll('b');
                }}
                disabled={this.state.answeredPoll}
              >
                Vote
              </Button>
            </ButtonContainer>
          </PreviewContainer>
        </Container>
      );
    }
  }

  render() {
    return (
      <div>
        <div
          hidden={this.state.showPoll}
        >
          Next Poll Will Start Soon
        </div>
        <div
          hidden={!this.state.showPoll}
        >
          {this.renderPreview()}
        </div>
      </div>
    );
  }
}
