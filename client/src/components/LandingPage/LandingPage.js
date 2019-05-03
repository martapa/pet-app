import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Dogs from './components/Dogs';

import './landing_page.scss';

class LandingPage extends Component {
  render() {
    return (
      <>
        <Navigation/>
        <Dogs/>
      </>
    );
  }
}

export default LandingPage;
