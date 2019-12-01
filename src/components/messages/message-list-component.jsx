import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Message from './message/message-component';
import './message-list.scss';

const MessageList = ({ messageList }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([...messageList])
  }, [messageList]);
  return (
    <div className="msg-wrppr">
      <div className="msg-wrppr__container">
        <ul>
          {
          messages.map(({ text, mine, time }, key) => <Message key={key} text={text} mine={mine} time={time} />)
          }
        </ul>
      </div>

    </div>
  );
};

MessageList.defaultProps = {
  messageList: [],
}

MessageList.propTypes = {
  messageList: PropTypes.array,
}
export default MessageList;
