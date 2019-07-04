import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardDeck, Row } from 'react-bootstrap';

import * as actions from '../../../actions';
import DogCard from './DogCard';
import _ from 'lodash';

class Dogs extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getDogs();
  }

  renderListItem(dog) {
    //console.log(dog)
    return <DogCard dog={dog} key={dog.id} />;
  }

  renderList() {
    if (this.props.dogs) {
      //console.log('propr', this.props);
      function checkStatus(wordToCompare) {
        return function(element) {
          return element.is_adopted == wordToCompare;
        };
      }
      const filteredDogs = this.props.dogs.filter(checkStatus(this.props.status));
      return _.map(filteredDogs, this.renderListItem.bind(this));
    }
  }

  render() {
    //console.log('status',this.props.status)
    return <Row>{this.renderList()}</Row>;
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return {
    dogs: state.dogs
  };
}

//export default Dogs;
export default connect(mapStateToProps, actions)(Dogs);
