import React from 'react';
import PropTypes from 'prop-types';
import Message from 'components/message/message-component';
import './message-list.scss';

const MessageList = (props) => {
  const { messageList } = props;
  return (
    <>
      <div className="message-container">
        {
          // eslint-disable-next-line react/prop-types
          messageList.forEach((messageUnit) => <Message message={messageUnit} />)
        }
      </div>
    </>
  );
}

MessageList.defaultProps = {
  messageList: [],
}

MessageList.propTypes = {
  messageList: PropTypes.array,
}
export default MessageList;
