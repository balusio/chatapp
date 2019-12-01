import pubSubLib from 'lib/pubSubLib';
import ChatInterface from 'lib/chatInterface';
/**
 * the chat service is the instance handler that communicates with an API
 * or message SDK, its in charge to be an abstract bridge for all the events
 * that will be attached and applied to the UI is based on a simple PubSub library
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
   * @param {string} chatRecipent calls the API service and create an instance
   * chat and open the instance that provides the emit and recieve
   * @returns {object} chatrooms properties,
   */
  async startChatRoom(sender, reciper) {
    const chatInstance = await this.chatInterface.startChannel(sender, reciper);
    this.chatRooms[chatInstance.channelID] = chatInstance;
    return this.chatRooms[chatInstance.channelID];
  }

  /**
   * emitEvent is a boilerplate with a channelID to emit different types of messages
   * without having to provide the whole chanel instance,
   * @param {string} message
   * @param {string} channel
   */
  emitEvent(event, message, channelID) {
    this.chatRooms[channelID].channel.emit(event, message);
  }
}
