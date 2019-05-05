import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Container } from 'react-bootstrap';
import  Navigation  from './components/LandingPage/components/Navigation'

import Routes from './Routes.js'

class App extends Component {
  render() {
    return (
      <>
      <Navigation/>
        <Routes />
        </>
    );
  }
}

export default withRouter(App);
