import React from 'react';
import WindowChatContainer from 'containers/window-container';
import 'stylesheets/main.scss';


const App = () => (
  <>
    <div className="container container--half">
      <WindowChatContainer />
    </div>
    <div className="container container--half">
      <WindowChatContainer />
    </div>
  </>
);

export default App;
