import React from 'react';
import styled from 'styled-components';
import Logo from './svg/Logo.jsx';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const LogoContainer = styled.div`
  width: 100px;
  margin: 0;
  padding: 0;
`;

const Title = styled.span`
  font-size: 50px;
  width: 100px;
  margin: 0;
  padding: 0;
`;

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Logo />
        <Title>
          Chat
        </Title>
      </Container>
    );
  }
}
