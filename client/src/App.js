import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Container } from 'react-bootstrap';
import Navigation from './components/LandingPage/components/Navigation';

import { connect } from 'react-redux';
import { getShelterUser } from './actions';
import { getToken } from './services/tokenService';

import Routes from './Routes.js';
import './App.scss'

class App extends Component {
  componentDidMount() {
    const token = getToken();

    if (token) this.props.getShelterUser();
  }

  render() {
    return (
      <>
        <Navigation />
        <Routes />
      </>
    );
  }
}

export default withRouter(connect(null, { getShelterUser })(App));
