import React, { Component } from 'react';
import Input from 'components/input/input-component';
import HeaderChat from 'components/header-chat/header-chat-component';
import MessageList from 'components/messages/message-list-component';
import ChatContext from 'context/chat-context';
import PropTypes from 'prop-types';
import 'stylesheets/chat.scss'
/**
 * WindowContainer Chat handles general events and trigger the Context function for the chat
 */
class WindowChatContainer extends Component {
  constructor() {
    super()
    this.state = {
      messageList: [],
    }
    this.ChatRoom = {};
  }

  componentDidMount() {
    const { channelReceiver } = this.props;
    const { name, chat } = this.context;
    console.log(name, 'mine user');
    console.log(channelReceiver, ' channel receiver');
    chat.startChatRoom(name, channelReceiver).then((response) => {
      this.ChatRoom = response;
      this.startSubscriptions();
    });
    // let i = 0;
    // const messageArray = [
    //   {
    //     text: 'helllo 1',
    //     mine: true,
    //   },
    //   {
    //     text: 'how are you? 2',
    //     mine: false,
    //   },
    //   {
    //     text: 'how are you? 3',
    //     mine: false,
    //   },
    // ];

    // const interval = setInterval(() => {
    //   if (i < messageArray.length) {
    //     this.setState({
    //       // eslint-disable-next-line
    //       messageList: [...this.state.messageList, data],
    //     })
    //     i++;
    //   } else {
    //     clearInterval(interval);
    //   }
    // }, 1000);
  }

  startSubscriptions() {
    this.ChatRoom.channel.on('message', (data) => {
      const message = {
        ...data,
        // eslint-disable-next-line react/destructuring-assignment
        mine: (data.user === this.context.name),
      }
      this.setState({
        // eslint-disable-next-line
        messageList: [...this.state.messageList, message],
      })
    })
    console.log(this.ChatRoom);
    setTimeout(() => {
      this.ChatRoom.channel.emit('message', {
        text: 'how are you? 3',
        // eslint-disable-next-line react/destructuring-assignment
        user: this.context.name,
      }, this.ChatRoom.channelID);
    }, 1000);
  }

  render() {
    return (
      <>
        <div className="container chat-container">
          <HeaderChat status />
          <MessageList
            // eslint-disable-next-line
            messageList={this.state.messageList}
          />
          <Input />
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
