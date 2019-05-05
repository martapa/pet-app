import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Dogs from './components/Dogs';
import { Row, Image, Container, Col } from 'react-bootstrap';

import './landing_page.scss';

class LandingPage extends Component {
  render() {
    return (
      <>
        <Container fluid>
          
          <Row>
            <Col className='main-col'>
            <h2 className='main-message'>Find dogs for adoption near you</h2>
            </Col>
          </Row>
          <Dogs />
        </Container>
      </>
    );
  }
}

export default LandingPage;
