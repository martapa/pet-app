// Import external dependencies
import React, { Component } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { setToken } from '../../services/tokenService';
import { Formik } from 'formik';
import { getShelterUser } from '../../actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as yup from 'yup';


//
// // Import local dependencies
import './login.scss';
import '../../styles/errors.scss';
const schema = yup.object({
  password: yup.string().required(),
  email: yup.string().email('Please enter a valid email').required(),
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      serverErrors: ''
    };

    this.handleClickCancel = this.handleClickCancel.bind(this);
  }

  handleClickCancel(){
    this.props.history.push('/')
  }

  render() {
    return (
      <>


        <Container fluid className="login">
          <Row className="login-row">
            {this.state.serverErrors && (
              <Container fluid className="errors">
                <Row>
                  <Col />
                  <Col xs={6} className="errors-col6">
                    <p>{this.state.serverErrors}</p>
                  </Col>
                  <Col />
                </Row>
              </Container>
            )}
            <Col />
            <Col xs={6} className="login-col6">

              <h4>Login to your account</h4>
              <Formik
                validationSchema={schema}
                onSubmit={async values => {
                  try {
                    console.log(values)
                    const response = await axios.post(
                      '/shelters/login',
                      values
                    );
                    const { data } = response.data;

                    setToken(data[0]);
                    // call redux action that fetches user and puts user in state
                    this.props.getShelterUser();
                    this.props.history.push('/');
                  } catch (error) {

                    console.log('error',error)
                    this.setState({
                      serverErrors: error.response.data.error
                    });
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
                        isInvalid={!!errors.email && touched.email}

                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                      <small id="emailHelp" className="form-text text-muted" />
                    </Form.Group>
                    <Form.Group controlID="formBasicPassword">
                      <Form.Label htmlFor="password">Password</Form.Label>
                      <Form.Control
                        id="password"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password && touched.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button className="button" type="submit">
                      Submit
                    </Button>
                    <Button className="button" onClick={this.handleClickCancel}>
                      Cancel
                    </Button>
                  </Form>
                )}
              </Formik>
            </Col>
            <Col />
          </Row>
        </Container>
      </>
    );
  }
}

// Module exports
function mapStateToProps(state) {
  console.log(state);
  return {
    shelter_user: state.shelter_user
  };
}

export default withRouter(
  connect(mapStateToProps, { getShelterUser })(LoginPage)
);
