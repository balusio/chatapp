import PubSubLib from './pubSubLib';
/**
 * Mock a chat library to be used as fake transmit and broadcaster for chats
 * imagine it as a fake backend singleton to test messages
 */

export default class ChatInterface extends PubSubLib {
  constructor(params) {
    if (ChatInterface.instance) {
      return ChatInterface.instance;
    }
    super(params);
    this.appId = params.APP_ID;
    this.host = params.HOST;
    this.chatRooms = {
      default: '123456',
    };
    this.users = [
      {
        name: 'Jorge',
        online: true,
        chatRooms: null,
        friends: ['pepito', 'pedro', 'mengano'],
      },
      {
        name: 'Pepito',
        online: true,
        chatRooms: null,
        friends: ['juan', 'pedro', 'mengano'],
      },
      {
        name: 'Mengano',
        online: false,
        chatRooms: null,
      },
      {
        name: 'Laura',
        online: false,
        chatRooms: null,
      },
      {
        name: 'Rob',
        online: false,
        chatRooms: null,
      },
    ];
    ChatInterface.instance = this;
    return this;
  }

  connect(appID, userId) {
    const userExist = this.users.filter((user) => user.name === userId);
    if (appID === this.appID && userExist) {
      this.users.forEach((user) => {
        if (user.name === userId) {
          // eslint-disable-next-line
          user.online = true;
        }
      })
      this.emit(`connect:${userId}`, true);
    }
  }

  /**
   * check if the channel is open, otherwise will create a new Chat with the users
   * @param {string} sender user who start the channel
   * @param {string} recipent user who recieve the channel
   */
  startChannel(sender, recipent) {
    // make the channel a uniqueID channel to publish and subscribe events
    const channelID = [sender, recipent].sort().join('');
    return new Promise((resolve, reject) => {
      if (Object.prototype.hasOwnProperty.call(this.chatRooms, channelID)) {
        resolve({
          channelID,
          success: true,
          channel: this.chatRooms[channelID],
        });
      } else {
        try {
          this.chatRooms[channelID] = new PubSubLib();
          resolve({
            channelID,
            success: true,
            channel: this.chatRooms[channelID],
          })
        } catch (error) {
          reject(error)
        }
      }
    })
  }

  emitMessage(message, channel) {
    this.chatRooms[channel].emit('message', message);
  }
}
