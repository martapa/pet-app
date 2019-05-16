import React, { Component } from 'react';
import { Col, Row, Container, Image } from 'react-bootstrap';
//import { getDogDetail } from '../../../actions/index';
import { connect } from 'react-redux';
import { getMyDogs } from '../../actions';
import DogCardProfile from './DogCardProfile';
import AddNewPetCard from './AddNewPetCard';

import _ from 'lodash';

class MePage extends Component {
  componentDidMount() {
    this.props.getMyDogs();
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

  render() {
    return (
      <>
        {this.props.shelter_user && (
          <Container fluid>
            <Row>
              <Col sm={4}>
                <Col sm={8} />
                <h2 style={{ 'text-align': 'center', 'margin-top': '100px' }}>
                  {this.props.shelter_user.shelter_name}
                </h2>
                <p>{this.props.shelter_user.description}</p>
                <p>Address: {this.props.shelter_user.address}</p>
                <p>Email: {this.props.shelter_user.email}</p>
              </Col>
            </Row>
            <Row>
              {this.renderList()}
              <AddNewPetCard />
            </Row>
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
    my_dogs: state.my_dogs,
  };
}

export default connect(mapStateToProps, { getMyDogs })(MePage);
