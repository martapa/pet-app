import React, { Component } from 'react';
import { Col, Row, Container, Image } from 'react-bootstrap';
//import { getDogDetail } from '../../../actions/index';
import { connect } from 'react-redux';
import './dog_detail.scss';

class DogDetail extends Component {
  constructor(props) {
    super(props);
    //console.log(this.props);
  }

  render() {
    return (
      <>
        {this.props.dog_detail && (
          <Container>
            <Row style={{ 'justify-content': 'center' }}>
              <Col sm={4}>
                <div className="img-dog-detail">
                  <img src={this.props.dog_detail.photo} />
                </div>
                <h1 className="dog-detail-name">{this.props.dog_detail.name}</h1>
              </Col>
            </Row>
            <Row style={{'padding-top': '100px'}}>
              <Col sm={6}>
                <h2 style={{'text-align': 'center'}}>Description</h2>
                <p>{this.props.dog_detail.description}</p>
              </Col>
              <Col sm={6}>
                <h2 style={{'text-align': 'center'}}>About</h2>

                <p>Age: {this.props.dog_detail.age}</p>
                <p>Shelter name: {this.props.dog_detail.shelter_info[0].shelter_name}</p>
                <p>Shelter address: {this.props.dog_detail.shelter_info[0].address}</p>
                <p>Contact: {this.props.dog_detail.shelter_info[0].email}</p>

              </Col>
            </Row>

          </Container>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  //console.log('state', state.dog_detail);
  return {
    dog_detail: state.dog_detail
  };
}

export default connect(mapStateToProps, null)(DogDetail);
