import React, { useState, useEffect } from 'react';
import './input.scss';
/**
 * input component
 */
export default () => {
  /**
   * @listen Input user onChange and set his value if his length is bigger than 3 characters
   */
  const [message, setMessage] = useState(null);
  /**
   * @listen Input password onChange and set his value if his length is bigger than 3 characters
   */
  const argumentValid = (arg) => ((arg && arg.length > 3) ? arg : null);
  useEffect(() => {
    const checkedMessage = argumentValid(message);
    // console.log(checkedMessage);
    setMessage(checkedMessage);
  });

  return (
    <div className="input-container">
      <div contentEditable spellCheck className="input-text" type="text" onChange={(e) => { setMessage(e.target.value); }} />
      <button className="send-button" type="button">
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
