import React, { Component } from 'react';
import { Col, Row, Container, Image } from 'react-bootstrap';
//import { getDogDetail } from '../../../actions/index';
import { connect } from 'react-redux';
import './dog_detail.scss';
import axios from 'axios';


class DogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  async componentDidMount() {
    //console.log(this.props)
    const pet_id = this.props.match.params.id
    const response = await axios.get(`/pets/${pet_id}`);
    this.setState(response.data.data[0][0])
    console.log("dog_detail",this.state);
    console.log(this.state.shelter_info[0].shelter_name)
    }
showPhone(){
  if(this.state.shelter_info){
    if(this.state.shelter_info[0].phone){
      return (
        <li key={this.state.shelter_info[0].phone}><Row><Col sm={4}><p><strong>Phone</strong></p></Col><Col><p> {this.state.shelter_info[0].phone}</p></Col></Row></li>
      );
    }
  }
}

formatEmail(){
  console.log(this.state.shelter_info[0].email.replace("@", "[ @ ]"));
  return (
    this.state.shelter_info[0].email.replace("@", "[@]")
);
}

formatGoodWith(){
  if(this.state.shelter_info){
      console.log(this.state.good_with.join(", "))
      return (
        <li key={this.state.good_with.length}><Row><Col sm={4}><p><strong>Good with</strong></p></Col><Col><p> {this.state.good_with.join(", ")}</p></Col></Row></li>
      );

  }
}
  render() {
    return (
      <>
          <Container className="dog-detail">
            <Row>
              <Col sm={1}/>
              <Col sm={10}>
                <Row className="row-info">
                  <Col sm={5} className="picture-col">
                    <img src={this.state.photo} />
                  </Col>
                  <Col sm={7} className="col-info">
                    <h3>Hello my name is {this.state.name}!</h3>
                    <p className="description">{this.state.description}</p>
                    <ul className="ul-details">
                      {this.state.is_adopted && <li key={this.state.is_adopted}><Row><Col sm={4}><p><strong>Status</strong></p></Col><Col><p>{this.state.is_adopted}</p></Col></Row></li>}
                      {this.state.age && <li key={this.state.age}><Row><Col sm={4}><p><strong>Age</strong></p></Col><Col><p> {this.state.age}</p></Col></Row></li>}
                      {this.state.size && <li key={this.state.size}><Row><Col sm={4}><p><strong>Size</strong></p></Col><Col><p> {this.state.size}</p></Col></Row></li>}
                      {this.state.gender && <li key={this.state.gender}><Row><Col sm={4}><p><strong>Gender</strong></p></Col><Col><p> {this.state.gender}</p></Col></Row></li>}
                      {this.state.shelter_info && <li key={this.state.shelter_info[0].shelter_name}><Row><Col sm={4}><p><strong>Shelter</strong></p></Col><Col><p> {this.state.shelter_info[0].shelter_name}</p></Col></Row></li>}
                      {this.state.shelter_info && <li key={this.state.shelter_info[0].address}><Row><Col sm={4}><p><strong>Address</strong></p></Col><Col><p> {this.state.shelter_info[0].address}</p></Col></Row></li>}
                      {this.state.shelter_info && <li key={this.state.shelter_info[0].email}><Row><Col sm={4}><p><strong>Email</strong></p></Col><Col><p>{this.formatEmail()}</p></Col></Row></li>}
                      {this.showPhone()}
                      {this.formatGoodWith()}

                    </ul>

                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
      </>
    );
  }
}


export default DogDetail;
