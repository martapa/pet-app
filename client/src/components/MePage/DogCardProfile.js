import React, { Component } from 'react';
import { Card, Button, Col, Modal } from 'react-bootstrap';
import { deleteDog, getDogDetail } from '../../actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './dog-card-profile.scss';

class DogCardProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickEditPhoto = this.handleClickEditPhoto.bind(this);

  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  async handleClickDelete() {
    const id = this.props.dog._id;
    await this.props.deleteDog(id);
    this.setState({ show: false });


  }
  async handleClickEditPhoto() {
    const id = this.props.dog._id;
    this.props.history.push(`/pet-photo-edit/${this.props.dog._id}`);
  }

  async handleClickEdit() {
    const id = this.props.dog._id;
    this.props.history.push(`/edit/${this.props.dog._id}`);
  }

  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete {this.props.dog.name}? You won't be
            able to get them back.
          </Modal.Body>
          <Modal.Footer>
            <Button className="button" onClick={this.handleClose}>
              Keep
            </Button>
            <Button className="button" onClick={this.handleClickDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <Col sm={4}>
          <Card className="dog-card-profile">
            <div className="img-container">
              <img src={this.props.dog.photo} />
            </div>
            <Card.Body>
              <Card.Title className="title-name">
                {this.props.dog.name}
              </Card.Title>
              <Button
                className="button outline small"
                onClick={this.handleShow}
              >
                Delete
              </Button>
              <Button
                className="button outline small"
                onClick={this.handleClickEdit}
              >
                Edit
              </Button>
              <Button
                className="button outline small"
                onClick={this.handleClickEditPhoto}
              >
                Edit Photo
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    dog_detail: state.dog_detail,
    my_dogs: state.my_dogs
  };
}

export default withRouter(
  connect(mapStateToProps, { deleteDog, getDogDetail })(DogCardProfile)
);
