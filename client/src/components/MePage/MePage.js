import React, { Component } from 'react';
import { Col, Row, Container, Image } from 'react-bootstrap';
//import { getDogDetail } from '../../../actions/index';
import { connect } from 'react-redux';

class MePage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <>
        {this.props.shelter_user && (
          <div className="container">
            <div className="row">
              <div className="col-sm-2" />
              <div className="col-sm-8">
                <h2 style={{'text-align': 'center'}}>{this.props.shelter_user.shelter_name}</h2>
                <p>{this.props.shelter_user.description}</p>
                <p>Address: {this.props.shelter_user.address}</p>
                <p>Email: {this.props.shelter_user.email}</p>


              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    shelter_user: state.shelter_user
  };
}

export default connect(mapStateToProps, null)(MePage);
