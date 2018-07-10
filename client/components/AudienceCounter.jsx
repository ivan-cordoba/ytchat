import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-Size: 20px;
  text-align: center;
  background-color: red;
  color: white;
  margin: 50px 0 0 0;
  padding: 10px 0 10px 0;
  width: 100%
`;

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
      <Container>
        Viewers {this.state.count}
      </Container>
    );
  }
}