// Import external dependencies
import React, { Component } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { setToken } from '../../services/tokenService';
import { Formik } from 'formik';

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
  }

  render() {
    return (
      <>
        <h1>Log In</h1>
        <div className="login">
          <Formik
            onSubmit={async values => {
              try {
                const response = await axios.post('/shelters/login', values);
                const { data } = response.data;

                setToken(data[0]);
                // call redux action that fetches user and puts user in state

                this.props.history.push('/');
              } catch (error) {
                console.log(error);
              }
            }}
            initialValues={{
              email: '',
              password: ''
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlID="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
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
                    value={values.password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlID="rememberMe">
                  <Form.Check type="checkbox" />
                  <Form.Label>Remember me</Form.Label>
                </Form.Group>
                <Button variant="dark" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  }
}

// Module exports
export default LoginPage;
