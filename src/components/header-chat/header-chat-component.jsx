/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import './header-chat.scss';

const HeaderChat = (props) => {
  return (
    <>
      <header className="h-chat">
        <div className="h-chat___status-bulb h-chat___status-bulb--online" />
        <div className="h-chat__text-container">
          <p>{ (props.status) ? 'Online' : 'Offline' }</p>
          <p className="typing">
            Typing
            <span>...</span>
          </p>
        </div>
      </header>
    </>
  );
}


HeaderChat.defaultProps = {
  status: false,
}

HeaderChat.propTypes = {
  status: PropTypes.bool,
}
export default HeaderChat;
