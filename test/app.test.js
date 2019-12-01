import React from 'react';
import { render } from 'enzyme';
import App from '../src/containers/main';


describe('check app working', () => {
  it('start app', () => {
    const AppWrapper = render(<App />);
    expect(AppWrapper.text()).toEqual('LauraRob');
  });
});
