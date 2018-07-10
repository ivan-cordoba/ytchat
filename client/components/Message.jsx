import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10px;
  font-size: 15px;
`;

const Username = styled.span`
  font-weight: bold;
`;

const MessageText = styled.span`

`;

const Message = props => (
  <Container>
    <Username>
      {props.msg.username}:
    </Username>
    <MessageText>
      {props.msg.text}
    </MessageText>
  </Container>
);

export default Message;
