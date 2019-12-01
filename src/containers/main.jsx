import React from 'react';
import WindowChatContainer from 'containers/chat-window-container';
import ChatService from 'services/chat-service/chat-service';
import ChatContext from 'context/chat-context';
import { APP_ID } from '../env';
import 'stylesheets/main.scss';
/**
 * provide an instance with the user and the Chat Context
 */
const userA = {
  name: 'Rob',
  chat: new ChatService({
    userID: APP_ID,
  }),
}

const userB = {
  name: 'Laura',
  chat: new ChatService({
    userID: APP_ID,
  }),
}
class App extends React.Component {
  render() {
    return (
      <div className="container chat-wrapper">
        <div className="container chat-wrapper__window">
          <ChatContext.Provider value={userA}>
            <WindowChatContainer channelReceiver={userB.name} />
          </ChatContext.Provider>
        </div>
        <div className="container chat-wrapper__window">
          <ChatContext.Provider value={userB}>
            <WindowChatContainer channelReceiver={userA.name} />
          </ChatContext.Provider>
        </div>
      </div>
    )
  }
}

export default App;
