import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './message.scss';

const Message = (props) => {
  const { mine, text, time } = props;
  const refElm = useRef();
  const fromMsg = (mine) ? 'out' : 'incomming';
  useEffect(() => {
    refElm.current.scrollIntoView({ block: 'end' });
  });
  return (
    <li className={`msg msg-${fromMsg}`} ref={refElm}>
      <div className={`msg__cont msg__cont--${fromMsg}`}>
        <div className={`msg__tail msg__tail--${fromMsg}`}>
          <span />
        </div>
        <span
          className="msg__txt"
          // eslint-disable-next-line react/no-danger-with-children
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <div className="msg__date">
          {time}
        </div>
      </div>
    </li>
  );
}

Message.defaultProps = {
  mine: true,
  text: 'string',
  time: 'string,',
}

Message.propTypes = {
  mine: PropTypes.bool,
  text: PropTypes.string,
  time: PropTypes.string,
}
export default Message;
