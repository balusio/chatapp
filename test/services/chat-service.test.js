
import ChatService from '../../src/services/chat-service/chat-service';

describe('start chat service', () => {
  let chatA;
  let chatB;
  let privateChatA;
  let privateChatB;
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
  it('should start a test and listen event', (done) => {
    let test = 'test';
    chatA.on('message', (data) => {
      test = data;
      expect(test).toEqual('subscribed_data');
      done();
    })
    chatA.emit('message', 'subscribed_data');
  });

  it('should start a chatRoom from the interface and get messages A->B', async (done) => {
    privateChatA = await chatA.startChatRoom('Laura', 'Rob');
    const channelA = privateChatA.channel.on('message', (data) => {
      expect(data).toEqual('hello');
      channelA.unsubscribe();
      done();
    });
    chatA.emitMessage('hello', privateChatA.channelID);
  });

  it('Should recieve a message from other channel instance B->A', async (done) => {
    privateChatB = await chatB.startChatRoom('Rob', 'Laura');
    const channelB = privateChatB.channel.on('message', (data) => {
      expect(data).toEqual('second message');
      channelB.unsubscribe();
      done();
    });
    chatA.emitMessage('second message', privateChatB.channelID);
  });
});
