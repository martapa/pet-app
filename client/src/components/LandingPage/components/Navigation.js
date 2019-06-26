import React, { Component } from 'react';
//import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
//import { LinkContainer, Routes } from "react-router-bootstrap";
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Nav, Navbar, Form, Button, FormControl, Image } from 'react-bootstrap';
import { Formik } from 'formik';
import axios from 'axios';
import Search from '../../commons/Search';

import * as actions from '../../../actions';
import { getDogsNearYou } from '../../../actions/index';

import { connect } from 'react-redux';

import '../landing_page.scss';
import './navigation.scss';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlPath: ''
    };
  }

  componentDidMount() {
    if (this.props.location.pathname === '/') {
      this.setState({
        urlPath: '/'
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({
        urlPath: this.props.location.pathname
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <header
        className={
          this.state.urlPath === '/'
            ? 'container-fluid light'
            : 'container-fluid dark'
        }
      >
        <div className="row">
          <div className="col">
            <Navbar expand="lg" className="navbar">
              <Link to="/" className="navbar-brand">
                Pet Search
              </Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  {!this.props.shelter_user && (
                    <>
                      <Nav.Link as={NavLink} to="/register" exact>
                        Register
                      </Nav.Link>
                      <Nav.Link as={NavLink} to="/login" exact>
                        Log in
                      </Nav.Link>
                    </>
                  )}
                  {this.props.shelter_user && (
                    <>
                      <Nav.Link as={NavLink} to="/me" exact>
                        My Account
                      </Nav.Link>
                      <Nav.Link as={NavLink} to="/logout" exact>
                        Log Out
                      </Nav.Link>
                    </>
                  )}
                </Nav>
                <Search />
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  //console.log('navigation', state);
  return {
    shelter_user: state.shelter_user,
    dogs_near_you: state.dogs_near_you
  };
}

export default withRouter(
  connect(mapStateToProps, { getDogsNearYou })(Navigation)
);
