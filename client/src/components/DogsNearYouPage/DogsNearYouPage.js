import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row } from 'react-bootstrap';

import DogCard from './DogCard';
import _ from 'lodash';

//import './landing_page.scss';

class DogsNearYouPage extends Component {
  renderListItem(dog) {
    console.log("dog", dog)
    return <DogCard dog={dog} key={dog.id} />;
  }

  renderList() {
    if (this.props.dogs_near_you) {
      //console.log("test", this.props.dogs_near_you)
      const test = _.map(this.props.dogs_near_you, (item) => {return item.pets_profiles}).flat();
      //console.log("test",test)
      return _.map(test, this.renderListItem.bind(this));
    }
  }

  render() {
    return <Row>{this.renderList()}</Row>;
  }
}

function mapStateToProps(state) {
  //console.log('dogs_near_you', state);
  return {
    dogs_near_you: state.dogs_near_you
  };
}

export default connect(mapStateToProps, null)(DogsNearYouPage);
