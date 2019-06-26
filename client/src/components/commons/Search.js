import React, { Component } from 'react';
//import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
//import { LinkContainer, Routes } from "react-router-bootstrap";
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, FormControl, Container, Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import axios from 'axios';

import * as actions from '../../actions';
import { getDogsNearYou } from '../../actions/index';

import './search.scss';


import { connect } from 'react-redux';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverErrors: '',
      urlPath: ''
    };
  }

  componentDidMount() {
    if (this.props.location.pathname === '/') {
      this.setState({
        urlPath: '/'
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({
        urlPath: this.props.location.pathname
      });
    }
  }

  render() {
    return (
      <>
                <Formik
                  onSubmit={async values => {
                    try {

                      const response = await axios.get(
                        `/geocode?address=,+${
                          values.search
                        }`
                      );
                      const lng =
                        response.data.data[0].results[0].geometry.location.lng;
                      const lat =
                        response.data.data[0].results[0].geometry.location.lat;
                      this.props.getDogsNearYou(lng, lat);
                      //console.log("navigation",this.props)
                      this.props.history.push('/dogs_near_you');

                    } catch (error) {
                      this.setState({
                        serverErrors: error.response.data.error
                      });
                    }
                  }}
                  initialValues={{
                    search: ''
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
                        className={this.state.urlPath === '/' ? "mr-sm-2 search-form-light" : "mr-sm-2 search-form-dark"}
                        value={values.search}
                        onChange={handleChange}
                      />
                      <Button
                        variant="outline-success"
                        type="submit"
                        className={this.state.urlPath === '/' ? "search-button-light" : "search-button-dark"}
                      >
                        Search
                      </Button>
                    </Form>
                  )}
                </Formik>
                {this.state.serverErrors && (
                  <p>{this.state.serverErrors}</p>
                )}
                </>
    );
  }
}

function mapStateToProps(state) {
  return {
    dogs_near_you: state.dogs_near_you
  };
}

export default withRouter(
  connect(mapStateToProps, { getDogsNearYou })(Search)
);
