import React from 'react';
import App from '../src/components/main/main';
import { render } from 'enzyme';

describe('check app working', () => {
  it('start app', () => {
    const AppWrapper = render(<App />);
    expect(AppWrapper.text()).toEqual('Hello World');
  });
});
