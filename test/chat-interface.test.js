import ChatInterface from '../src/lib/chatInterface';

describe('Chat Interface', () => {
  let chatInterface;
  let chatInterfaceB;
  let channelRoomA;
  let channelRoomB;
  beforeAll(() => {
    chatInterface = new ChatInterface({
      APP_ID: '123456',
      USER: 'jorge@jorge.com',
      HOST: 'nowhere.dev',
    });
    chatInterfaceB = new ChatInterface({
      APP_ID: '123456',
      USER: 'pepito@pepito.com',
      HOST: 'nowhere.dev',
    });
  });
  it('Should start the chat Interface with params object', (done) => {
    const channelRecipent = 'pepito';
    chatInterface.connect('123456', 'jorge');
    chatInterface.startChannel('jorge', channelRecipent).then((response) => {
      channelRoomA = response.channel;
      expect(response.channelID).toEqual(`jorge${channelRecipent}`);
      expect(response.success).toBeTruthy();
      done();
    })
  });
  it('Should start a second Chat with otheruser', (done) => {
    const channelRecipent = 'jorge';
    chatInterfaceB.connect('123456', 'pepito');
    chatInterfaceB.startChannel('pepito', channelRecipent).then((response) => {
      channelRoomB = response.channel;
      expect(response.channelID).toEqual(`${channelRecipent}pepito`);
      expect(response.success).toBeTruthy();
      done();
    })
  });

  it('should publish and subscribe to the same channel on different instances', (done) => {
    const channelB = channelRoomB.on('message', (data) => {
      expect(data).toEqual('hello');
      channelB.unsubscribe();
      done();
    });
    channelRoomA.emit('message', 'hello');
  })

  it('should publish and subscribe to the different channel on same instances', (done) => {
    channelRoomA.on('message', (data) => {
      expect(data).toEqual('supp');
      done();
    });
    channelRoomB.emit('message', 'supp');
  })
});
