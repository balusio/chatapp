import React, { useState, useEffect } from 'react';
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
    <>
      <input type="text" onChange={(e) => { setMessage(e.target.value); }} />
    </>
  )
}
