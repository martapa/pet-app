import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Row } from 'react-bootstrap';

import DogCard from '../LandingPage/components/DogCard';
import _ from 'lodash';

import './dogs-near-you-page.scss';

class DogsNearYouPage extends Component {
  renderListItem(dog) {
    return <DogCard dog={dog} key={dog._id} />;
  }

  renderList() {
    if (this.props.dogs_near_you) {
      const test = _.map(this.props.dogs_near_you, item => {
        return item.pets_profiles;
      }).flat();

      return _.map(test, this.renderListItem.bind(this));
    }
  }

  render() {
    return (
      <Container className="dogs-near-you">
        <Row>{this.renderList()}</Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    dogs_near_you: state.dogs_near_you
  };
}

export default connect(mapStateToProps, null)(DogsNearYouPage);
