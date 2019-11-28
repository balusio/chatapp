import React from 'react';
import { render } from 'enzyme';
import App from '../src/components/main/main';


describe('check app working', () => {
  it('start app', () => {
    const AppWrapper = render(<App />);
    expect(AppWrapper.text()).toEqual('Hello World');
  });
});
