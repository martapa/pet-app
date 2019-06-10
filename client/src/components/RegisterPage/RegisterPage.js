import React, { Component } from 'react';
import { debounce } from 'lodash';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import { google_api_key } from '../../keys.js';
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


import '../../styles/forms.scss';

//const phoneRegEx =
const schema = yup.object({
  shelter_name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
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
  street: yup.string().required('Please enter street number and name'),
  city: yup.string().required('Please enter the city'),
  province: yup.string().required('Province is required'),
  zip: yup
    .string()
    .max(7, 'Too long')
    .required('Zip code is required')
});
class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelter_name: '',
      email: '',
      password: '',
      avatar: '',
      description: '',
      phone: '',
      volonteer_name: '',
      //location: '',
      street: '',
      city: '',
      province: '',
      zip: ''
    };
    //this.debounceChange = debounce(this.handleChange, 0);
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange = event => {
  //   this.setState({ [event.target.id]: event.target.value });
  // };
  // //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
  // handleSubmit(event) {
  //   alert('Submitted: ', this.state);
  //   console.log(this.state);
  //   //console.log(google_api_key);
  //   event.preventDefault();
  // }

  render() {
    return (
      <>
      <Container fluid className="my-form">
        <Row>
          <Col sm={1}/>
          <Col xs={10}>
            <Formik
              validationSchema={schema}
              onSubmit={async values => {
                //console.log(values);
                const street2 = values.street.split(' ').join('+');
                const city2 = '+' + values.city.split(' ').join('+');
                const address = [street2, city2, values.province].join(',');
                console.log(address);
                try {
                  const response = await axios.get(
                    `/geocode?address=,+${address}`
                  );
                  console.log(response);
                  //const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${google_api_key}`);
                  const location = [response.data.data[0].results[0].geometry.location.lng, response.data.data[0].results[0].geometry.location.lat];
                  // console.log(response);
                  //const formatted_address =
                  const formatted_address = response.data.data[0].results[0].formatted_address
                  console.log(formatted_address);
                  const shelter = {
                    shelter_name: values.shelter_name,
                    email: values.email,
                    password: values.password,
                    avatar: values.avatar,
                    description: values.description,
                    phone: values.phone,
                    volonteer_name: values.volonteer_name,
                    location: {
                      type:'Point',
                      coordinates: location
                    },
                    address: formatted_address
                  }
                  //console.log(shelter);
                  const post_shelter = await axios.post('/shelters/register', shelter);
                  this.props.history.push('/login');
                } catch (err) {
                  console.log(err);
                }
              }}
              initialValues={{
                shelter_name: '',
                email: '',
                password: '',
                avatar: '',
                description: '',
                phone: '',
                volonteer_name: '',
                //location: '',
                street: '',
                city: '',
                province: '',
                zip: ''
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
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        isInvalid={!!errors.email && touched.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        isInvalid={!!errors.password && touched.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
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
                        isInvalid={!!errors.description && touched.description}
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
                    <Form.Group controlId="formGridAddress1">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        name="street"
                        type="text"
                        placeholder="1234 Main St"
                        onChange={handleChange}
                        value={values.street}
                        isInvalid={!!errors.street && !!touched.street}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.adress}
                      </Form.Control.Feedback>
                    </Form.Group>

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
                          isInvalid={!!errors.province && !!touched.province}
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
                      value={values.savatar}
                    />
                    </Col>
                  </Row>
                </Container>
                  <Button className="form-button" type="submit">
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
          <Col sm={1}/>

        </Row>
      </Container>
      </>
    );
  }
}
export default withRouter(RegisterPage);
