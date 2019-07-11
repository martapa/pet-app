import React, { Component } from 'react';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getToken } from '../../../../services/tokenService';

import '../../../../styles/core/forms.scss';
import '../../../../styles/core/errors.scss';

class EditProfilePhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverErrors: '',
      file: {}
    };
    this.handleClickCancel = this.handleClickCancel.bind(this);
  }

  handleClickCancel() {
    this.props.history.push('/');
  }

  render() {
    return (
      <>
        <Container fluid className="my-form">
          <Row>
            {this.state.serverErrors && (
              <Container fluid className="errors">
                <Row>
                  <Col />
                  <Col xs={6} className="errors-col-6">
                    <p>{this.state.serverErrors}</p>
                  </Col>
                  <Col />
                </Row>
              </Container>
            )}
            <Col sm={1} />
            <Col xs={10}>
              <Formik
                onSubmit={async values => {
                  try {
                    const data = new FormData();

                    data.append('file', this.state.file);
                    const token = getToken();

                    await axios.patch('/shelters/editProfilePhoto/', data, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                        'content-type': 'multipart/form-data'
                      }
                    });
                    this.props.history.push('/me');
                  } catch (error) {
                    this.setState({
                      serverErrors: error.response.data.error
                    });
                  }
                }}
                initialValues={{
                  avatar: ''
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
                  <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Container>
                      <Row>
                        <Col xs={6}>
                          <Form.Label>Upload Photo</Form.Label>
                          <Form.Control
                            type="file"
                            name="avatar"
                            onChange={event => {
                              this.setState({
                                file: event.target.files[0]
                              });
                            }}
                          />
                        </Col>
                      </Row>
                    </Container>
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
            <Col sm={1} />
          </Row>
        </Container>
      </>
    );
  }
}
export default withRouter(EditProfilePhoto);
