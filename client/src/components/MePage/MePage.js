import React, { Component } from 'react';
import { Col, Row, Container, Image, Card, Button } from 'react-bootstrap';
//import { getDogDetail } from '../../../actions/index';
import { connect } from 'react-redux';
import { getMyDogs } from '../../actions';
import DogCardProfile from './DogCardProfile';
import AddNewPetCard from './AddNewPetCard';

import _ from 'lodash';

class MePage extends Component {
  componentDidMount() {
    this.props.getMyDogs();
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    //console.log('this.props.getMyDogs', this.props.getMyDogs());
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
                    <Button className="button" variant="dark" onClick={this.handleClickDelete}>
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

export default connect(mapStateToProps, { getMyDogs })(MePage);
