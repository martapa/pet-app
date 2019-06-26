import React, { Component } from 'react';
import {
  Col,
  Row,
  Container,
  Image,
  Card,
  Button,
  Modal
} from 'react-bootstrap';
//import { getDogDetail } from '../../../actions/index';
import { connect } from 'react-redux';
import { getMyDogs, userLogOut, getShelterUser } from '../../actions';
import DogCardProfile from './DogCardProfile';
import AddNewPetCard from './AddNewPetCard';
import { withRouter, Link } from 'react-router-dom';
import { removeToken, getToken } from '../../services/tokenService';
import axios from 'axios';

import _ from 'lodash';
import './me-page.scss';

class MePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      shelter_profile: {}
    };
  }

  async componentDidMount() {
    this.props.getMyDogs();
    this.props.getShelterUser();

    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickAddPet = this.handleClickAddPet.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  renderListItem(dog) {
    return <DogCardProfile dog={dog} key={dog.id} />;
  }

  renderList() {
    if (this.props.my_dogs) {
      return _.map(this.props.my_dogs, this.renderListItem.bind(this));
    }
  }

  async handleClickDelete() {
    let token = getToken();
    const delete_shelter = await axios.delete('/shelters/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    token = removeToken();
    this.props.userLogOut();
    this.props.history.push('/');
  }
  async handleClickEdit() {
    const id = this.props.shelter_user._id;
    this.props.history.push(`/profile-edit/${id}`);
  }
  handleClickAddPet() {
    this.props.history.push('/addform/');
  }

  render() {
    return (
      <>
        {this.props.shelter_user && (
          <Container className="me-page">
            <Row className="row-shelter-name">
              <h4>{this.props.shelter_user.shelter_name} pets</h4>
            </Row>
            <Row>
              <Col sm={4} className="my-profile-panel">
                <Row>
                  <Col>
                    <div className="img-container">
                      <img src={this.props.shelter_user.avatar} />
                    </div>
                    <ul>
                      {this.props.shelter_user.address && (
                        <li key={this.props.shelter_user.address}>
                          <h2>Address</h2>
                          <p>{this.props.shelter_user.address}</p>
                        </li>
                      )}
                      {this.props.shelter_user.phone && (
                        <li key={this.props.shelter_user.phone}>
                          <h2>Phone</h2>
                          <p>{this.props.shelter_user.phone}</p>
                        </li>
                      )}
                      {this.props.shelter_user.email && (
                        <li key={this.props.shelter_user.email}>
                          <h2>Email</h2>
                          <p>{this.props.shelter_user.email}</p>
                        </li>
                      )}
                      {this.props.shelter_user.volonteer_name && (
                        <li key={this.props.shelter_user.volonteer_name}>
                          <h2>Volonteer</h2>
                          <p>{this.props.shelter_user.volonteer_name}</p>
                        </li>
                      )}
                      {this.props.my_dogs && (
                        <li key={this.props.my_dogs.length}>
                          <h2>My Pets</h2>
                          <p>{this.props.shelter_user.pets.length}</p>
                        </li>
                      )}
                    </ul>
                  </Col>
                </Row>

                <Button className="button" onClick={this.handleClickAddPet}>
                  Add Pet
                </Button>

                <Button className="button" onClick={this.handleClickEdit}>
                  Edit Profile
                </Button>
                <Button className="button outline" onClick={this.handleShow}>
                  Delete Account
                </Button>
              </Col>
              <Col sm={8}>
                <Row>{this.renderList()}</Row>
              </Col>
            </Row>

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Delete account</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete your account? You won't be able
                to get it back.
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
          </Container>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    shelter_user: state.shelter_user,
    my_dogs: state.my_dogs
  };
}

export default withRouter(
  connect(mapStateToProps, { getMyDogs, userLogOut, getShelterUser })(MePage)
);
