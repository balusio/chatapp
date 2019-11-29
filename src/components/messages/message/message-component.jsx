import React from 'react';
import PropTypes from 'prop-types';
import './message.scss';

const Message = (props) => {
  const { mine, text } = props;
  const fromMsg = (mine) ? 'out' : 'incomming';
  return (
    <li className={`msg msg-${fromMsg}`}>
      <div className={`msg__cont msg__cont--${fromMsg}`}>
        <div className={`msg__tail msg__tail--${fromMsg}`}>
          <span />
        </div>
        <span className="msg__txt">{text}</span>
        <div className="msg__date"> 11:09 </div>
      </div>
    </li>
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
