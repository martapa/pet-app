import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import Search from '../../commons/Search';

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
                Adopster
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
  return {
    shelter_user: state.shelter_user,
    dogs_near_you: state.dogs_near_you
  };
}

export default withRouter(
  connect(mapStateToProps, { getDogsNearYou })(Navigation)
);
