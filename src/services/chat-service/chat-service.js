
/**
 * the chat service is the instance handler that communicates with an API
 * it provides all the events that will be attached and applied to the UI
 * is based on a simple Pub/subscribe pattern easier than RXJS for insipiration
 * @see https://medium.com/@thebabscraig/javascript-design-patterns-part-2-the-publisher-subscriber-pattern-8fe07e157213
 */
export default class chatService {
  /**
   * @param {object} params general config for the chatInstance
   * @param {string} id user id to start the instance listener
   */
  constructor(params) {
    this.userID = params.userID;
    this.eventsList = {};
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

  /**
   * @param {string} event subscriber
   * @return {object} unsubscribe to delete the eventListener
   */
  on(event, callback) {
    if (!Object.prototype.hasOwnProperty.call(this.eventsList, event)) {
      this.eventsList[event] = [];
    }
    // liste the index of the array when you push it, and provide an instance to remove it
    const index = this.eventsList[event].push(callback) - 1;
    return {
      unsubscribe() {
        this.eventsLists[event].splice(index, 1);
      },
    }
  }

  /**
   * @param {string} event publish event and register it
   */
  emit(event, data) {
    if (!this.eventsList[event]) return;
    this.eventsList[event].forEach((onCallback) => {
      onCallback(data);
    });
  }

  emitMessages(message, data) {
    this.emit('message', data);
  }
}
