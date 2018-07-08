import React from 'react';

const Message = props => (
  <div>
    Message: {props.msg.text}
    <br />
    From: {props.msg.username}
  </div>
);

export default Message;
