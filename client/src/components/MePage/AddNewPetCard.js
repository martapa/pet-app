import React, { Component } from 'react';
import { Card, Button, Col } from 'react-bootstrap';
//import { deleteDog } from '../../actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';




class AddNewPetCard extends Component {
  constructor(props) {
    super(props);
    //console.log(props.dog)
    this.handleClickAdd = this.handleClickAdd.bind(this);

  }
  async handleClickAdd() {
    console.log('add')
    //await this.props.deleteDog(id);
    // //console.log("get_detail",this.props.getDogDetail(id))
    this.props.history.push('/addform/');
  }

  render() {
    return (
      <Col sm={4}>
        <Card className="dog-card">
          <div className="img">
          <img src="https://theivrgroup.org/images/free-blank-dog-lineart-18.jpg" />
          </div>
          <Card.Body>
            <Card.Title>Name</Card.Title>
            <Button variant="dark" onClick={this.handleClickAdd}>
              Add New
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}


function mapStateToProps(state){
  console.log(state);
  return {
    dog_detail: state.dog_detail,
    my_dogs: state.my_dogs
  };
}

export default withRouter(connect(mapStateToProps, null)(AddNewPetCard));
//export default connect(mapStateToProps, null)(AddNewPetCard);
