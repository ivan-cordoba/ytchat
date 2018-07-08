import React from 'react';
import Preview from './Preview.jsx';

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
    this.updateChoices = this.updateChoices.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('poll', this.startPoll);
    this.props.socket.on('tally', this.updateTally);
    this.props.socket.on('poll choices', this.updateChoices);
  }

  startPoll() {
    this.setState({
      showPoll: true,
      answeredPoll: false,
    });
  }

  answerPoll(choice) {
    this.setState({
      answeredPoll: true,
    });
    this.props.socket.emit('poll answer', choice);
  }

  updateTally(newTally) {
    this.setState({
      tallyA: newTally[0],
      tallyB: newTally[1],
    });
  }

  updateChoices(choices) {
    this.setState({
      choiceA: choices[0],
      choiceB: choices[1],
    });
  }

  renderPreview() {
    if (this.state.choiceA && this.state.choiceB) {
      return (
        <div>
          <Preview
            url={this.state.choiceA.snippet.thumbnails.default.url}
          /> A: {this.state.tallyA}
          <button
            onClick={() => {
              this.answerPoll('a');
            }}
            disabled={this.state.answeredPoll}
          >
            Vote
          </button>
          <br />
          <Preview
            url={this.state.choiceB.snippet.thumbnails.default.url}
          /> B: {this.state.tallyB}
          <button
            onClick={() => {
              this.answerPoll('b');
            }}
            disabled={this.state.answeredPoll}
          >
            Vote
          </button>
        </div>
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
