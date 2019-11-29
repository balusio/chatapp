import React from 'react';
import PropTypes from 'prop-types';
import './message.scss';

const Message = (props) => {
  const { mine, text } = props;
  const classes = (mine) ? 'mine' : 'incomming';
  return (
    <>
      <div className={`msg-${classes}`}>
        {text}
      </div>

    </>
  );
}

Message.defaultProps = {
  mine: true,
  text: 'string',
}

Message.propTypes = {
  mine: PropTypes.bool,
  text: PropTypes.string,
}
export default Message;
