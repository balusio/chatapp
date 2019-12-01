import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/input/input-component';
import HeaderChat from 'components/header-chat/header-chat-component';
import MessageList from 'components/messages/message-list-component';
import ChatContext from 'context/chat-context';

import 'stylesheets/chat.scss'
/**
 * WindowContainer Chat handles general events \
 * and trigger the Context function for the chat
 */
class WindowChatContainer extends Component {
  constructor() {
    super()
    this.state = {
      messageList: [],
      chatRoomId: '',
      typing: false,
    }
    this.ChatRoom = {};
  }

  componentDidMount() {
    const { channelReceiver } = this.props;
    const { name, chat } = this.context;
    chat.startChatRoom(name, channelReceiver).then((response) => {
      this.ChatRoom = response;
      this.setState({ chatRoomId: response.channelID })
      this.startSubscriptions();
    });
  }

  startSubscriptions() {
    this.ChatRoom.channel.on('typing', (data) => {
      const { name } = this.context;
      if (data.user === name) {
        this.setState({
          typing: true,
        })
        setTimeout(() => {
          this.setState({
            typing: false,
          })
        }, 1200);
      }
    });
    this.ChatRoom.channel.on('message', (data) => {
      const { name } = this.context;
      const message = {
        ...data,
        mine: (data.user === name),
      }
      this.setState({
        // eslint-disable-next-line
        messageList: [...this.state.messageList, message],
      })
    });
  }

  render() {
    const { typing, messageList, chatRoomId } = this.state;
    const { channelReceiver } = this.props;
    return (
      <>
        <div className="container chat-container">
          <HeaderChat
            status={typing}
            name={channelReceiver}
          />
          <MessageList
            messageList={messageList}
          />
          <Input
            chatRoomId={chatRoomId}
            channelReceiver={channelReceiver}
          />
        </div>
      </>
    )
  }
}
WindowChatContainer.defaultProps = {
  channelReceiver: '',
}

WindowChatContainer.propTypes = {
  channelReceiver: PropTypes.string,
}

WindowChatContainer.contextType = ChatContext;

export default WindowChatContainer;
