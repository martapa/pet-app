import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Navigation from './components/LandingPage/components/Navigation';
import Footer from './components/Footer/Footer';
import { getShelterUser } from './actions';
import { getToken } from './services/tokenService';

import Routes from './Routes.js';
import './App.scss';

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
        <Footer />
      </>
    );
  }
}

export default withRouter(connect(null, { getShelterUser })(App));
