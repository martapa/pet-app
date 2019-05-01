// Import external dependencies
import React, { Component } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

//
// // Import local dependencies
import './login.scss';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
    this.debounceChange = debounce(this.handleChange, 300);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (id, value) => {
    this.setState({ [id]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      const response = await axios.post('/shelters/login', {
        email: email,
        password: password
      });
      console.log(email)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>

        <h1>Log In</h1>
        <div className="login">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlID="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                id="email"
                type="email"
                placeholder="Enter email"
                onChange={({ target: { id, value } }) => {
                  this.debounceChange(id, value);
                }}
              />
              <small id="emailHelp" className="form-text text-muted" />
            </Form.Group>
            <Form.Group controlID="formBasicPassword">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                type="password"
                className="form-control"
                placeholder="Password"
                autoComplete="new-password"
                onChange={({ target: { id, value } }) => {
                  this.debounceChange(id, value);
                }}
              />
            </Form.Group>
            <Form.Group controlID="rememberMe">
              <Form.Check type="checkbox" />
              <Form.Label>Remember me</Form.Label>
            </Form.Group>
            <Button variant="dark">Submit</Button>
          </Form>
        </div>

      </>
    );
  }
}

// Module exports
export default LoginPage;
