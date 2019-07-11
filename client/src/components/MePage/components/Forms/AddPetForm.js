import React, { Component } from 'react';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik, FieldArray } from 'formik';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

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

class AddPetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      size: '',
      age: '',
      gender: '',
      photo: '',
      description: '',
      is_adopted: '',
      good_with: '',
      file: {}
    };

    this.handleClickCancel = this.handleClickCancel.bind(this);
  }

  handleClickCancel() {
    this.props.history.push('/me');
  }

  render() {
    return (
      <Container fluid className="my-form">
        <Row>
          <Col xs={1} />
          <Col xs={10}>
            <Formik
              validationSchema={schema}
              onSubmit={async values => {
                const good_with_arr = values.good_with[0]
                  ? values.good_with[0].split(',')
                  : [];

                try {
                  const data = new FormData();

                  data.append('name', values.name);
                  data.append('size', values.size);
                  data.append('age', values.age);
                  data.append('gender', values.gender);
                  data.append('description', values.description);
                  data.append('is_adopted', values.is_adopted);
                  data.append('good_with', good_with_arr);
                  data.append('file', this.state.file);

                  const token = getToken();
                  await axios.post('/pets', data, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      'content-type': 'multipart/form-data'
                    }
                  });

                  this.props.history.push('/me');
                } catch (err) {
                  console.log(err);
                }
              }}
              initialValues={{
                name: '',
                size: '',
                age: '',
                gender: '',
                photo: '',
                description: '',
                is_adopted: '',
                good_with: []
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
                setFieldValue
              }) => (
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                  <Container>
                    <Row>
                      <Col xs={6}>
                        <Form.Label>Pet Name:</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          onChange={handleChange}
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
                        <Form.Label>Photo:</Form.Label>
                        <Form.Control
                          type="file"
                          name="photo"
                          onChange={event => {
                            this.setState({
                              file: event.target.files[0]
                            });
                          }}
                        />
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
                    Add Pet!
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
    );
  }
}
export default withRouter(AddPetForm);
