import pubSubLib from 'lib/pubSubLib';
/**
 * the chat service is the instance handler that communicates with an API
 * it provides all the events that will be attached and applied to the UI
 * is based on a simple PubSub library
 */
export default class chatService extends pubSubLib {
  /**
   * @param {object} params general config for the chatInstance
   * @param {string} id user id to start the instance listener
   */
  constructor(params) {
    super(params);
    this.userID = params.userID;
    // this.chatInterface = new chatIterface({
    //   appid : '123456',
    //   user  : this.userdID,
    // });
  }

  /**
   * @param {string} chatRecipent calls the API service and create an instance chat and open the websocket that provides
   * the emit and recieve
   */
  initChat(chatRecipent) {
    this.chatID = this.userID + chatRecipent;
  }

  emitMessages(message, data) {
    this.emit('message', data);
  }
}
