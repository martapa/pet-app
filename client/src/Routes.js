import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import LandingPage from './components/LandingPage/LandingPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import DogsNearYouPage from './components/DogsNearYouPage/DogsNearYouPage';




export const routes = [
  { path: '/', component: LandingPage },
  { path: '/register', component: RegisterPage},
  { path: '/login', component: LoginPage},
  { path: '/dogs_near_you', component: DogsNearYouPage },
];

const genKey = path => `route:${path}`;

class Router extends Component {
  // Render method should always be last
  render() {
    // Render a Switch component with a route for each item in the routes array
    return (
      <Switch>
        {routes.map(config => (
          <Route exact {...config} key={genKey(config.path)} />
        ))}
      </Switch>
    );
  }
}

export default Router;
