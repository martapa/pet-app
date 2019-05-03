import React, { Component } from 'react';
//import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
//import { LinkContainer, Routes } from "react-router-bootstrap";
import { Link, NavLink } from 'react-router-dom';
import { Nav, Navbar, Form, Button, FormControl, Image } from 'react-bootstrap';
import { Formik } from 'formik';
import axios from 'axios';
import * as actions from '../../../actions';
import { getDogsNearYou } from '../../../actions/index';

import { google_api_key } from '../../../keys.js';
import { connect } from 'react-redux';



import '../landing_page.scss';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Navbar expand="lg" className="navbar">
          <Navbar.Brand href="#home">Pet Search </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/register" exact>
                Register
              </Nav.Link>
              <Nav.Link as={NavLink} to="/login" exact>
                Log in
              </Nav.Link>
            </Nav>
            <Formik
              onSubmit={async values => {
                try {
                  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=,+${values.search}&key=${google_api_key}`)
                  const lng = response.data.results[0].geometry.location.lng
                  const lat = response.data.results[0].geometry.location.lat
                  this.props.getDogsNearYou(lng, lat);
                  this.props.history.push('/dogs_near_you');


                } catch (error) {
                  console.log(error);
                }
              }}
              initialValues={{
                search: '',
              }}
              >
              {({
                handleSubmit,
                handleChange,
                values,
                touched,
                errors
              }) => (
                <Form inline onSubmit={handleSubmit}>
                  <FormControl
                    id="search"
                    type="text"
                    placeholder="Your city"
                    className="mr-sm-2"
                    value={values.search}
                    onChange={handleChange}
                  />
                <Button variant="outline-success" type="submit" className="navbar-search">
                    Search
                  </Button>
                </Form>
              )}
            </Formik>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    dogs_near_you: state.dogs_near_you
  };
}

export default connect(mapStateToProps, { getDogsNearYou })(Navigation);
