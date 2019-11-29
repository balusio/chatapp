import React from 'react';
import WindowChatContainer from 'containers/window-container';
import 'stylesheets/main.scss';


const App = () => (
  <div className="container chat-wrapper">
    <div className="container">
      <WindowChatContainer />
    </div>
    <div className="container">
      <WindowChatContainer />
    </div>
  </div>

);

export default App;
