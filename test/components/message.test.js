
import React from 'react';
import { mount } from 'enzyme';
import MessageList from '../../src/components/messages/message-list-component';
// https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675#bfd5

describe('Message simple functionality', () => {
  it('Should render html indise innerChild', () => {
    window.HTMLElement.prototype.scrollIntoView = () => {};
    const propsTest = [
      {
        text: 'hello',
        mine: true,
        time: '10:00 am',
      },
    ];
    const MessageComp = mount(<MessageList messageList={propsTest} />);
    expect(MessageComp.find('li')).toHaveLength(1);
  });
});
