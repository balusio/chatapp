import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Message from './message/message-component';
import './message-list.scss';

const MessageList = ({ messageList }) => {
  const [messages, setMessages] = useState([]);
  let scrollElem = React.createRef();
  useEffect(() => {
    if (messageList.length > 0) {
      setMessages([...messageList])
    }
    scrollElem.scrollTo(0, scrollElem.scrollHeight + 400);
  }, [messageList]);
  return (
    <div className="msg-wrppr">
      <ul className="msg-wrppr__container" ref={(el) => { scrollElem = el }}>
        {
        messages.map(({ text, mine }, key) => {
          // eslint-disable-next-line no-unused-expressions
          return <Message key={key} text={text} mine={mine} />
        })
        }
      </ul>
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
