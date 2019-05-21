import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { removeToken } from '../../services/tokenService';


class LogOutPage extends Component {
  constructor(props) {
    super(props);
    //console.log(props.dog)
    this.handleClickYes = this.handleClickYes.bind(this);
    this.handleClickNo = this.handleClickNo.bind(this);
  }
  async handleClickYes() {
    this.props.history.push('/')
    const token = removeToken();



  }
  handleClickNo() {
    this.props.history.push('/')
  }

render(){
return(
  <Card>
  <Card.Body>
    <Card.Title>Log Out</Card.Title>
    <Card.Text>
      Are you sure you want to log out?
    </Card.Text>
    <div className="buttons">
    <Button className="button" variant="dark" onClick={this.handleClickYes}>
      Yes
    </Button>
    <Button className="button" variant="dark" onClick={this.handleClickNo}>
      No
    </Button>
    </div>
  </Card.Body>
</Card>
);
}

}

export default withRouter(LogOutPage);
