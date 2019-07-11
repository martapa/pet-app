import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';

import * as actions from '../../../actions';
import DogCard from './DogCard';
import _ from 'lodash';

class Dogs extends Component {
  componentDidMount() {
    this.props.getDogs();
  }

  renderListItem(dog) {
    return <DogCard dog={dog} key={dog._id} />;
  }

  renderList() {
    if (this.props.dogs) {
      function checkStatus(wordToCompare) {
        return function(element) {
          // eslint-disable-next-line
          return element.is_adopted == wordToCompare;
        };
      }
      const filteredDogs = this.props.dogs.filter(
        checkStatus(this.props.status)
      );
      return _.map(filteredDogs, this.renderListItem.bind(this));
    }
  }

  render() {
    return <Row>{this.renderList()}</Row>;
  }
}

function mapStateToProps(state) {
  return {
    dogs: state.dogs
  };
}

export default connect(mapStateToProps, actions)(Dogs);
