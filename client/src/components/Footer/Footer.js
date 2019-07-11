/* eslint-disable */
import React, { Component } from 'react';
import { Col, Row, Container, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './footer.scss';

class Footer extends Component {
  render() {
    return (
      <footer>
        <Container>
          <Row>
            <Col sm={3}>
              <h2>Adopster</h2>
            </Col>
            <Col sm={3}>
              <h3>Cities</h3>
              <ul>
                <li>
                  <a href="#">Toronto</a>
                </li>
                <li>
                  <a href="#">Montreal</a>
                </li>
                <li>
                  <a href="#">Vancouver</a>
                </li>
              </ul>
            </Col>
            <Col sm={3}>
              <h3>Account</h3>
              <ul>
                {!this.props.shelter_user && (
                  <>
                    <li>
                      <Nav.Link as={NavLink} to="/register" exact>
                        Register
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link as={NavLink} to="/login" exact>
                        Log in
                      </Nav.Link>
                    </li>
                  </>
                )}
                {this.props.shelter_user && (
                  <>
                    <li>
                      <Nav.Link as={NavLink} to="/me" exact>
                        My Account
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link as={NavLink} to="/logout" exact>
                        Log Out
                      </Nav.Link>
                    </li>
                  </>
                )}
              </ul>
            </Col>
            <Col sm={3}>
              <h3>Social</h3>
              <ul>
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>Copyright © 2019</Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

function mapStateToProps(state) {
  return {
    shelter_user: state.shelter_user
  };
}

export default connect(mapStateToProps, null)(Footer);
