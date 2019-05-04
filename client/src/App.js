import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Container } from 'react-bootstrap';

import Routes from './Routes.js'

class App extends Component {
  render() {
    return (
      <Container fluid>
        <h2>PetsApp</h2>
        <Routes />
      </Container>
    );
  }
}

export default withRouter(App);
