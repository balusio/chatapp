import React from 'react';
import { mount } from 'enzyme';
import Input from '../../src/components/input/input-component';

describe('Input test', () => {
  it('should get the input html', () => {
    const InputComp = mount(<Input chatRoomId="123456" />);
    expect(InputComp.find('.input-text').exists()).toBeTruthy()
  });
});
