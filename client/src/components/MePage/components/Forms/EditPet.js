import React, { Component } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik, FieldArray } from 'formik';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getToken } from '../../../../services/tokenService';

import '../../../../styles/core/forms.scss';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  size: yup.string(),
  age: yup.string().required('Age is required'),
  gender: yup.string(),
  photo: yup.string(),
  description: yup
    .string()
    .required('Description is required')
    .max(1000, 'Maximum of 1000 characters'),
  is_adopted: yup.string().required('Required'),
  good_with: yup.string()
});
const categories = [
  { id: 'dogs', name: 'dogs' },
  { id: 'cats', name: 'cats' },
  { id: 'children', name: 'children' }
];

class EditPet extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleClickCancel = this.handleClickCancel.bind(this);
  }

  async componentDidMount() {
    const pet_id = this.props.match.params.id;
    const response = await axios.get(`/pets/${pet_id}`);

    this.setState(response.data.data[0][0]);
  }

  handleClickCancel() {
    this.props.history.push('/me');
  }

  render() {
    return (
      <>
        {this.state.name && (
          <Container fluid className="my-form">
            <Row>
              <Col xs={1} />
              <Col xs={10}>
                <Formik
                  validationSchema={schema}
                  onSubmit={async values => {
                    try {
                      const token = getToken();
                      const id = this.state._id;
                      await axios.patch(`/pets/${id}`, values, {
                        headers: {
                          Authorization: `Bearer ${token}`
                        }
                      });

                      this.props.history.push('/me');
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  initialValues={this.state}
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
                            <Form.Label>Pet Name:</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              onChange={handleChange}
                              placeholder={values.name}
                              value={values.name}
                              isInvalid={!!errors.name && !!touched.name}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                            <Form.Group>
                              <Form.Label>Size:</Form.Label>
                              <Form.Control
                                as="select"
                                type="text"
                                name="size"
                                onChange={handleChange}
                                value={values.size}
                              >
                                <option>Choose...</option>
                                <option>extra-small</option>
                                <option>small</option>
                                <option>medium</option>
                                <option>large</option>
                                <option>extra-large</option>
                              </Form.Control>
                            </Form.Group>
                            <Form.Label>Age:</Form.Label>
                            <Form.Control
                              type="age"
                              name="age"
                              onChange={handleChange}
                              value={values.age}
                              isInvalid={!!errors.age && !!touched.age}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.age}
                            </Form.Control.Feedback>
                            <Form.Group>
                              <Form.Label>Gender:</Form.Label>
                              <Form.Control
                                as="select"
                                type="text"
                                name="gender"
                                onChange={handleChange}
                                value={values.gender}
                              >
                                <option>Choose...</option>
                                <option>female</option>
                                <option>male</option>
                              </Form.Control>
                            </Form.Group>
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
                            <Form.Group>
                              <Form.Label>Availability:</Form.Label>
                              <Form.Control
                                as="select"
                                type="text"
                                name="is_adopted"
                                onChange={handleChange}
                                value={values.is_adopted}
                                isInvalid={
                                  !!errors.is_adopted && touched.is_adopted
                                }
                              >
                                <option>Choose...</option>
                                <option>For adoption</option>
                                <option>Already adopted</option>
                              </Form.Control>
                              <Form.Control.Feedback type="invalid">
                                {errors.is_adopted}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Label>Good with:</Form.Label>
                            <FieldArray
                              name="good_with"
                              render={arrayHelpers => (
                                <div>
                                  {categories.map(category => (
                                    <div key={category.id}>
                                      <label>
                                        <input
                                          name="good_with"
                                          type="checkbox"
                                          value={category.id}
                                          checked={values.good_with.includes(
                                            category.id
                                          )}
                                          onChange={e => {
                                            if (e.target.checked)
                                              arrayHelpers.push(category.id);
                                            else {
                                              const idx = values.good_with.indexOf(
                                                category.id
                                              );
                                              arrayHelpers.remove(idx);
                                            }
                                          }}
                                        />{' '}
                                        {category.name}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              )}
                            />
                          </Col>
                        </Row>
                      </Container>
                      <Button className="button" type="submit">
                        Edit!
                      </Button>
                      <Button
                        className="button"
                        onClick={this.handleClickCancel}
                      >
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
    dog_detail: state.dog_detail
  };
}

export default withRouter(connect(mapStateToProps, null)(EditPet));
