import React, { Component } from 'react';
import Dogs from './components/Dogs';
import { Row, Container, Col } from 'react-bootstrap';
import Search from '../commons/Search';

import './landing_page.scss';

class LandingPage extends Component {
  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col className="main-col">
              <h1>Find dogs for adoption near you</h1>
              <h4>
                Type your city and we'll show you pets for adoption in your area
              </h4>
              <Search />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col sm={2} />
            <Col sm={8} className="meet-dogs">
              <h2>Meet your new friend</h2>
            </Col>
            <Col sm={2} />
          </Row>
          <Dogs status="For adoption" />
          <Row>
            <Col sm={2} />
            <Col sm={8} className="meet-dogs">
              <h2>Dogs that found their homes</h2>
            </Col>
            <Col sm={2} />
          </Row>
          <Dogs status="Already adopted" />
        </Container>
      </>
    );
  }
}

export default LandingPage;
