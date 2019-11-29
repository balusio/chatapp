import React, { Component } from 'react';
import Input from 'components/input/input-component';
import HeaderChat from 'components/header-chat/header-chat-component';
import 'stylesheets/chat.scss'

export default class WindowChatContainer extends Component {
  render() {
    return (
      <>
        <div className="container chat-container">
          <HeaderChat status />
          <Input />
        </div>
      </>
    )
  }
}
