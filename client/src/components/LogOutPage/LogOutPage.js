import React, { Component } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { removeToken } from '../../services/tokenService';
import { userLogOut } from '../../actions/';
import { connect } from 'react-redux';

import './log-out.scss';

class LogOutPage extends Component {
  constructor(props) {
    super(props);
    this.handleClickYes = this.handleClickYes.bind(this);
    this.handleClickNo = this.handleClickNo.bind(this);
  }

  async handleClickYes() {
    removeToken();
    this.props.userLogOut();
    this.props.history.push('/');
  }

  handleClickNo() {
    this.props.history.push('/');
  }

  render() {
    return (
      <Container fluid className="log-out">
        <Row>
          <Col sm={2} />
          <Col sm={8}>
            <Card>
              <Card.Body>
                <Card.Title>Log Out</Card.Title>
                <Card.Text>Are you sure you want to log out?</Card.Text>
                <div className="buttons">
                  <Button className="button" onClick={this.handleClickYes}>
                    Yes
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button className="button" onClick={this.handleClickNo}>
                    No
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={2} />
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    shelter_user: state.shelter_user
  };
}

export default withRouter(connect(mapStateToProps, { userLogOut })(LogOutPage));
