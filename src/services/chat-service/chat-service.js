import pubSubLib from 'lib/pubSubLib';
import ChatInterface from 'lib/chatInterface';
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
    this.chatInterface = new ChatInterface({
      APP_ID: '123456',
      HOST: 'nowhere.dev',
    });
    this.chatRooms = {};
  }

  /**
   * @param {string} chatRecipent calls the API service and create an instance chat and open the websocket that provides
   * the emit and recieve
   */
  async startChatRoom(sender, reciper) {
    const chatInstance = await this.chatInterface.startChannel(sender, reciper);
    this.chatRooms[chatInstance.channelID] = chatInstance;
    return this.chatRooms[chatInstance.channelID];
  }

  /**
   * @param {string} message
   * @param {string} channel
   */
  emitMessage(message, channelID) {
    this.chatRooms[channelID].channel.emit('message', message);
  }
}
