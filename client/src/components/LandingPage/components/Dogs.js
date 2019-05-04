import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardDeck, Row } from 'react-bootstrap';


import * as actions from '../../../actions';
import DogCard from './DogCard';
import _ from 'lodash';

class Dogs extends Component {
  componentDidMount() {
    this.props.getDogs();
  }

  renderListItem(dog) {
    //console.log(dog)
    return <DogCard dog={dog} key={dog.id} />;
  }

  renderList() {
    if (this.props.dogs) {
      //console.log(this.props.dogs)
      return _.map(this.props.dogs, this.renderListItem.bind(this));
    }
  }

  render() {
    return <Row>
      {this.renderList()}
    </Row>;
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    dogs: state.dogs
  };
}

//export default Dogs;
export default connect(mapStateToProps, actions)(Dogs);
