import ChatService from '../../src/services/chat-service/chat-service';

describe('start chat service', () => {
  let chatA;
  let chatB;
  beforeAll(() => {
    chatA = new ChatService({
      userID: '123',
    });
    chatB = new ChatService({
      userID: '456',
    });
  })

  it('Should start 2 different instances of the chat', () => {
    expect(chatA).toBeInstanceOf(ChatService);
    expect(chatB).toBeInstanceOf(ChatService);
  });
  it('Should have instances of id', () => {
    expect(chatA.userID).toEqual('123');
    expect(chatB.userID).toEqual('456');
  });
  it('should fire and listen event', (done) => {
    let test = 'test';
    chatA.on('message', (data) => {
      test = data;
      expect(test).toEqual('subscribed_data');
      done();
    })
    chatA.emit('message', 'subscribed_data');
  });
});
