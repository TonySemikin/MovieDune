import React from 'react';
import { shallow } from 'enzyme';
import Error from '../Error';

// Basic example for one case only

let wrapped;

beforeEach(() => {
  wrapped = shallow(<Error type='fatal'/>);
});

it('Error shown on screen', () => {
  expect(wrapped.find('div').length).toEqual(1);
});
