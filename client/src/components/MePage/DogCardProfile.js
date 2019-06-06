import React, { Component } from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { deleteDog, getDogDetail } from '../../actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './dog-card-profile.scss';

class DogCardProfile extends Component {
  constructor(props) {
    super(props);
    //console.log(props.dog)
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }
  async handleClickDelete() {
    //console.log('delete');
    const id = this.props.dog._id;
    //console.log('id', id);
    await this.props.deleteDog(id);
  }
  async handleClickEdit() {
    //console.log('edit');
    const id = this.props.dog._id
    this.props.history.push(`/edit/${this.props.dog._id}`)
    //console.log('id',id);
    //await this.props.getDogDetail(id);
    //console.log("get_detail",this.props.getDogDetail(id))

  }

  // componentWillUpdate() {
  //   // if (this.props.dog_detail)
  //   //   this.props.history.push(`/edit/${this.props.dog_detail._id}`);
  // }

  render() {
    return (
      <Col sm={4}>
       <Card className="dog-card dog-card-profile">
         <div className="img">
           <img src={this.props.dog.photo} />
         </div>
         <Card.Body>
           <Card.Title className="title-name">
             {this.props.dog.name}
           </Card.Title>
           <p className="titles">{this.props.dog.is_adopted}</p>
           <ul>
           {this.props.dog.age && <li key={this.props.dog.age}>Age {this.props.dog.age}</li>}

             {this.props.dog.size && <li key={this.props.dog.size}>{this.props.dog.size}</li>}

             {this.props.dog.gender && <li key={this.props.dog.gender}>{this.props.dog.gender}</li>}
           </ul>
           <Card.Text className="description">
             {this.props.dog.description}
           </Card.Text>
           {this.props.dog.good_with.length !== 0 ? (
             <p className="titles">Good with</p>
           ) : (
             <div />
           )}
           <ul>
             {this.props.dog.good_with.map((element, index) => {
               return <li key={index}>{element}</li>;
             })}
           </ul>
           <div className="buttons">
           <Button className="button" variant="dark" onClick={this.handleClickDelete}>
             Delete
           </Button>
           <Button className="button" variant="dark" onClick={this.handleClickEdit}>
             Edit
           </Button>
           </div>
         </Card.Body>
       </Card>
     </Col>
    );
  }
}

function mapStateToProps(state) {
  //console.log("dogcardprofile",state);
  return {
    dog_detail: state.dog_detail,
    my_dogs: state.my_dogs
  };
}

export default withRouter(connect(mapStateToProps, { deleteDog, getDogDetail })(DogCardProfile));
//export default connect(mapStateToProps, { deleteDog })(DogCardProfile);
