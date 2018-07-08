import React from 'react';

export default class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPoll: false,
      answeredPoll: false,
      tallyA: 0,
      tallyB: 0,
    };
    this.answerPoll = this.answerPoll.bind(this);
    this.startPoll = this.startPoll.bind(this);
    this.updateTally = this.updateTally.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('poll', this.startPoll);
    this.props.socket.on('tally', this.updateTally);
  }

  startPoll() {
    this.setState({
      showPoll: true,
      answeredPoll: false,
    });
  }

  answerPoll() {
    this.setState({
      answeredPoll: true,
    });
    this.props.socket.emit('poll', 'a');
  }

  updateTally(newTally) {
    this.setState({
      tallyA: newTally[0],
      tallyB: newTally[1],
    });
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
          <div>
            A: {this.state.tallyA}
            <br />
            B: {this.state.tallyB}
          </div>
          <button
            onClick={this.answerPoll}
            disabled={this.state.answeredPoll}
          >
            Answer Poll
          </button>
        </div>
      </div>
    );
  }
}
