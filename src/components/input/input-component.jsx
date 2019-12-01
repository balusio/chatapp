import React, {
  useState,
  useContext,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ChatContext from 'context/chat-context';
import './input.scss';
/**
 * input component handles messages inputs and send them trought the Context
 */
const InputComponent = (props) => {
  const { chatRoomId } = props;
  const textEl = useRef(null);
  const chatRoom = useContext(ChatContext);
  /**
   * @listen Input user onChange and set his value if his length is bigger than 3 characters
   */
  const [message, setMessage] = useState('');
  /**
   * @emit message and clean data from the input element
   */
  const sendMessage = () => {
    if (message.length <= 0) return;
    chatRoom.chat.emitEvent('message', {
      text: message,
      time: moment().format('LT'),
      user: chatRoom.name,
    }, chatRoomId);
    setMessage('');
    textEl.current.innerHTML = '';
  };

  const setMessageAndTyping = () => {
    const text = textEl.current.innerHTML;
    setMessage(text);
    if (text.length < 3) return;
    chatRoom.chat.emitEvent('typing', { user: props.channelReceiver }, chatRoomId);
  };
  /**
   * @param {object} e native event handling
   * @lisent the 'Enter key' and triggers
   */
  const checkKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="input-container">
      <div
        contentEditable
        spellCheck
        className="input-text"
        type="text"
        ref={textEl}
        onInput={setMessageAndTyping}
        onKeyPress={checkKey}
      />
      <button className="send-button" type="button" onClick={() => sendMessage()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 28 28"
        >
          <path
            d="M3 3 L3 25 L23 14 z"
            stroke="white"
            strokeWidth="3"
            fill="transparent"
          />
        </svg>
        <div className="send-button__arrow" />
      </button>
    </div>
  )
}

InputComponent.defaultProps = {
  chatRoomId: '',
  channelReceiver: '',
}

InputComponent.propTypes = {
  chatRoomId: PropTypes.string,
  channelReceiver: PropTypes.string,
}
export default InputComponent;
