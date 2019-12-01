/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import './header-chat.scss';

const HeaderChat = (props) => {
  const { name } = props;
  return (
    <>
      <header className="h-chat">
        <div className="h-chat___status-bulb h-chat___status-bulb--online" />
        <div className="h-chat__text-container">
          <p>{ name }</p>
          {(props.status) ? (
            <p className="typing">
              Typing
              <span>...</span>
            </p>
          ) : '' }
        </div>
      </header>
    </>
  );
}


HeaderChat.defaultProps = {
  status: false,
  name: '',
}

HeaderChat.propTypes = {
  status: PropTypes.bool,
  name: PropTypes.string,
}
export default HeaderChat;
