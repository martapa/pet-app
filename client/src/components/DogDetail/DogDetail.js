import React, { Component } from 'react';
import { Col, Row, Container, Image } from 'react-bootstrap';
//import { getDogDetail } from '../../../actions/index';
import { connect } from 'react-redux';
import './dog_detail.scss';

class DogDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.dog_detail && (
          <Container fluid className="dog-detail">
            <Row style={{ 'justify-content': 'center' }}>
              <Col sm={8}>
                <Row>
                  <Col sm={3} />
                  <Col sm={6}>
                    <div className="img-dog-detail">
                      <img src={this.props.dog_detail.photo} />
                    </div>
                  </Col>
                </Row>

                <h1 className="dog-detail-name">
                  {this.props.dog_detail.name}
                </h1>
                <p style={{ color: '#A3A3A3', 'text-align': 'center' }}>
                  {this.props.dog_detail.shelter_info[0].address}
                </p>
              </Col>
            </Row>
            <Row>
              <Col sm={2} />
              <Col sm={8} className="dog-info">
                <h3>Pet Information</h3>
                <ul>
                  {this.props.dog_detail.age && (
                    <li key={this.props.dog_detail.age}>
                      Age {this.props.dog_detail.age}
                    </li>
                  )}

                  {this.props.dog_detail.size && (
                    <li key={this.props.dog_detail.size}>
                      {this.props.dog_detail.size}
                    </li>
                  )}

                  {this.props.dog_detail.gender && (
                    <li key={this.props.dog_detail.gender}>
                      {this.props.dog_detail.gender}
                    </li>
                  )}
                </ul>
                <p>{this.props.dog_detail.description}</p>
                <h3>Shelter Information</h3>
                <h4 style={{ color: '#A3A3A3', 'text-align': 'center' }}>
                  {this.props.dog_detail.shelter_info[0].shelter_name}
                </h4>
                <p>{this.props.dog_detail.shelter_info[0].description}</p>
                <ul>
                  {this.props.dog_detail.shelter_info[0].phone && (
                    <li key={this.props.dog_detail.shelter_info[0].phone}>
                      {' '}
                      {this.props.dog_detail.shelter_info[0].phone}
                    </li>
                  )}

                  {this.props.dog_detail.shelter_info[0].email && (
                    <li key={this.props.dog_detail.shelter_info[0].email}>
                      {this.props.dog_detail.shelter_info[0].email}
                    </li>
                  )}
                </ul>
              </Col>
              <Col sm={2} />
            </Row>
          </Container>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  console.log('state', state.dog_detail);
  return {
    dog_detail: state.dog_detail
  };
}

export default connect(mapStateToProps, null)(DogDetail);
