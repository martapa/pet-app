import React, { Component } from 'react';

import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik, FieldArray } from 'formik';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getToken } from '../../../../services/tokenService';
import '../../../../styles/forms.scss';

//import './register.scss';

const schema = yup.object({
  shelter_name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Please enter an valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  avatar: yup.string(),
  description: yup.string().required('Description is required'),
  phone: yup
    .string()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Phone number is not valid'
    ),
  volonteer_name: yup.string(),
  street: yup.string(),
  city: yup.string(),
  province: yup.string(),
  zip: yup.string().max(7, 'Too long')
});

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serverErrors: '',
      shelter: {}
    };
    this.handleClickCancel = this.handleClickCancel.bind(this);
  }
  async componentDidMount() {
    const shelter_id = this.props.match.params.id;
    const response = await axios.get(`/shelters/${shelter_id}`);

    const shelter = response.data.data[0];
    shelter['street'] = shelter.address.split(',')[0];
    shelter['city'] = shelter.address.split(',')[1];
    shelter['province'] = shelter.address
      .split(',')[2]
      .substring(0, 3)
      .trim();
    shelter['zip'] = shelter.address
      .split(',')[2]
      .substring(3, 11)
      .trim();
    this.setState({ shelter: shelter });
  }
  handleClickCancel(){
    this.props.history.push('/me');
  }

  render() {
    return (
      <>

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
        {this.state.shelter.shelter_name && (
          <Container fluid className="my-form">
            <Row>
              <Col xs={1} />
              <Col xs={10}>
                <Formik
                  validationSchema={schema}
                  onSubmit={async values => {
                    console.log('values', values);
                    const street2 = '+' + values.street.split(' ').join('+');
                    const city2 = values.city.replace(' ', '+');
                    const address = [street2, city2, values.province].join(',');
                    try {
                      const response = await axios.get(
                        `/geocode?address=,+${address}`
                      );
                      const location = [
                        response.data.data[0].results[0].geometry.location.lng,
                        response.data.data[0].results[0].geometry.location.lat
                      ];
                      const formatted_address =
                        response.data.data[0].results[0].formatted_address;

                      const shelter = {
                        shelter_name: values.shelter_name,
                        email: values.email,
                        password: values.password,
                        avatar: values.avatar,
                        description: values.description,
                        phone: values.phone,
                        volonteer_name: values.volonteer_name,
                        location: {
                          type: 'Point',
                          coordinates: location
                        },
                        address: formatted_address
                      };
                      Object.keys(shelter).forEach(key => shelter[key] === undefined && delete shelter[key])
                      console.log('shelter', shelter);



                      const token = getToken();
                      const edit_shelter = await axios.patch(
                        '/shelters/',
                        shelter,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`
                          }
                        }
                      );
                      this.props.history.push('/me');
                    } catch (error) {
                      this.setState({
                        serverErrors: error.response.data.error
                      });
                    }
                  }}
                  initialValues={this.state.shelter}
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
                      <Container>
                        <Row>
                          <Col xs={6}>
                            <Form.Label>Shelter Name:</Form.Label>
                            <Form.Control
                              type="text"
                              name="shelter_name"
                              onChange={handleChange}
                              value={values.shelter_name}
                              isInvalid={
                                !!errors.shelter_name && !!touched.shelter_name
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.shelter_name}
                            </Form.Control.Feedback>
                            <Form.Label>Volonteer Name:</Form.Label>
                            <Form.Control
                              type="text"
                              name="volonteer_name"
                              onChange={handleChange}
                              value={values.volonteer_name}
                            />
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows="7"
                              name="description"
                              onChange={handleChange}
                              value={values.description}
                              isInvalid={
                                !!errors.description && touched.description
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.description}
                            </Form.Control.Feedback>
                          </Col>
                          <Col xs={6}>
                            <Form.Label>Phone:</Form.Label>
                            <Form.Control
                              type="text"
                              name="phone"
                              onChange={handleChange}
                              value={values.phone}
                              isInvalid={!!errors.phone && touched.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.phone}
                            </Form.Control.Feedback>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              name="street"
                              type="text"
                              onChange={handleChange}
                              value={values.street}
                              isInvalid={!!errors.street && !!touched.street}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.adress}
                            </Form.Control.Feedback>

                            <Form.Row>
                              <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                  name="city"
                                  onChange={handleChange}
                                  value={values.city}
                                  isInvalid={!!errors.city && !!touched.city}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.city}
                                </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Province</Form.Label>
                                <Form.Control
                                  name="province"
                                  as="select"
                                  onChange={handleChange}
                                  value={values.province}
                                  isInvalid={
                                    !!errors.province && !!touched.province
                                  }
                                >
                                  <option>Choose...</option>
                                  <option>AB</option>
                                  <option>BC</option>
                                  <option>MB</option>
                                  <option>NB</option>
                                  <option>NL</option>
                                  <option>NT</option>
                                  <option>NS</option>
                                  <option>NU</option>
                                  <option>ON</option>
                                  <option>PE</option>
                                  <option>QC</option>
                                  <option>SK</option>
                                  <option>YT</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                  {errors.province}
                                </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control
                                  name="zip"
                                  onChange={handleChange}
                                  value={values.zip}
                                  isInvalid={!!errors.zip && !!touched.zip}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.zip}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Form.Row>
                            <Form.Label>Avatar:</Form.Label>
                            <Form.Control
                              type="text"
                              name="avatar"
                              onChange={handleChange}
                              value={values.avatar}
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
            </Row>
          </Container>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    shelter_user: state.shelter_user
    // my_dogs: state.my_dogs
  };
}

export default withRouter(connect(mapStateToProps, null)(EditProfile));
