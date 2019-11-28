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
    ChatInterface.instance = this;
    this.appId = params.APP_ID;
    this.host = params.HOST;
    this.chatRooms = {
      default: '123456',
    };
    this.users = [
      {
        name: 'jorge',
        online: true,
        chatRooms: null,
        friends: ['pepito', 'pedro', 'mengano'],
      },
      {
        name: 'pepito',
        online: true,
        chatRooms: null,
        friends: ['juan', 'pedro', 'mengano'],
      },
      {
        name: 'mengano',
        online: false,
        chatRooms: null,
      },
    ];
    // this.on(`chatService:${this.user}:message`, () => {
    //   this.returnConnection();
    // });
    return this;
  }

  connect(appID, userId) {
    const userExist = this.users.filter((user) => user.name === userId);
    if (appID === this.appID && userExist) {
      this.users.forEach((user) => {
        if (user.name === userId) {
          user.online = true;
        }
      })
      this.emit(`connect:${userId}`, true);
    }
  }
  /**
   * check if the channel is open, otherwise will
   * @param {*} sender
   * @param {*} recipent
   */

  startChannel(sender, recipent) {
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
