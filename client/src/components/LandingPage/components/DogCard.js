import React, { Component } from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './dog-card.scss';

class DogCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  async handleClick() {
    const id = this.props.dog._id;
    this.props.history.push(`/details/${id}`);
  }
  render() {
    return (
      <Col sm={4}>
        <Card className="dog-card">
          <div className="img">
            <img src={this.props.dog.photo} alt={this.props.dog.name} />
          </div>
          <Card.Body>
            <Card.Title>{this.props.dog.name}</Card.Title>
            <Button className="button" onClick={this.handleClick}>
              Learn More
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  return {
    dog_detail: state.dog_detail
  };
}

export default withRouter(connect(mapStateToProps, null)(DogCard));
