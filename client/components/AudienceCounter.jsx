import React from 'react';

export default class AudienceCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.updateAudienceCount = this.updateAudienceCount.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('audience update', this.updateAudienceCount);
  }

  updateAudienceCount(count) {
    this.setState({ count });
  }

  render() {
    return (
      <div>
        Count {this.state.count}
      </div>
    );
  }
}