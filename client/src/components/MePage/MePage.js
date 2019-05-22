import React, { Component } from 'react';
import { Col, Row, Container, Image, Card, Button, Modal } from 'react-bootstrap';
//import { getDogDetail } from '../../../actions/index';
import { connect } from 'react-redux';
import { getMyDogs, userLogOut } from '../../actions';
import DogCardProfile from './DogCardProfile';
import AddNewPetCard from './AddNewPetCard';
import { withRouter } from 'react-router-dom';
import { removeToken, getToken } from '../../services/tokenService';
import axios from 'axios';

import _ from 'lodash';

class MePage extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    }
  }

  componentDidMount() {
    this.props.getMyDogs();
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);


    //console.log('this.props.getMyDogs', this.props.getMyDogs());
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  renderListItem(dog) {
    //console.log(dog)
    return <DogCardProfile dog={dog} key={dog.id} />;
  }

  renderList() {
    if (this.props.my_dogs) {
      //console.log(this.props.dogs)
      return _.map(this.props.my_dogs, this.renderListItem.bind(this));
    }
  }

  async handleClickDelete() {
    console.log('delete');
    let token = getToken();
    const delete_shelter = await axios.delete(
      '/shelters/',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    token = removeToken();
    this.props.userLogOut();
    this.props.history.push('/')

  }
  async handleClickEdit() {
    console.log('edit');
    const id = this.props.shelter_user._id
    this.props.history.push(`/profile-edit/${id}`)

  }

  render() {
    return (
      <>
        {this.props.shelter_user && (



          <Container fluid>
            <Row>
              <Col sm={6}>
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{this.props.shelter_user.shelter_name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {this.props.shelter_user.address}
                    </Card.Subtitle>
                    <Card.Text>
                      {this.props.shelter_user.description}
                    </Card.Text>
                    <div className="buttons">
                    <Button className="button" variant="dark" onClick={this.handleShow}>
                      Delete Account
                    </Button>
                    <Button className="button" variant="dark" onClick={this.handleClickEdit}>
                      Edit Profile
                    </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6}>
                <AddNewPetCard />
              </Col>
            </Row>
            <Row>{this.renderList()}</Row>
              <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Delete account</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete your account? You won't be able to get it back.</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Keep
                </Button>
                <Button variant="primary" onClick={this.handleClickDelete}>
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
  //console.log(state);
  return {
    shelter_user: state.shelter_user,
    my_dogs: state.my_dogs
  };
}

export default withRouter(connect(mapStateToProps, { getMyDogs, userLogOut })(MePage));
