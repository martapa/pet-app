import React, { Component } from 'react';
import { Card, Button, Col } from 'react-bootstrap';

class DogCard extends Component {
  constructor(props) {
    super(props);
    //console.log(props.dog)
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log("Dog card", this.props.dog._id);
  }
  render() {
    return (
      <Col sm={4}>
        <Card>
          <Card.Img
            variant="top"
            src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=660&q=80"
          />
          <Card.Body>
            <Card.Title>{this.props.dog.name}</Card.Title>
            <Button variant="dark" onClick={this.handleClick}>
              Check details
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default DogCard;
