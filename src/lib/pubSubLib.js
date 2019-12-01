/**
 * class to be used as Publish/suscriber Pattern for the services chat communications
 * pattern easier than RXJS for insipiration
 * @see https://medium.com/@thebabscraig/javascript-design-patterns-part-2-the-publisher-subscriber-pattern-8fe07e157213
 */
export default class pubSubLib {
  constructor() {
    this.eventsList = {};
  }

  /**
   * @param {string} event subscriber event to listen changes
   * @return {object} unsubscribe function to delete the eventListener
   */
  on(event, callback) {
    if (!Object.prototype.hasOwnProperty.call(this.eventsList, event)) {
      this.eventsList[event] = [];
    }
    // listen the index of the array when you push it, and provide an instance to remove it
    const index = this.eventsList[event].push(callback) - 1;
    return {
      unsubscribe: () => {
        this.eventsList[event].splice(index, 1);
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
}
