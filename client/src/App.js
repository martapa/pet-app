import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Routes from './Routes.js'

class App extends Component {
  render() {
    return (
      <div>
        <h2>PetsApp</h2>
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);
