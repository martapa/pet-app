import React from 'react';
import { shallow } from 'enzyme';

import LoginPage from '../components/LoginPage/LoginPage';

describe('LoginPage component test with Enzyme', () => {
  it('renders without crashing', () => {
    shallow(<LoginPage />);
  });
});
