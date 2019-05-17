import React, { Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik, FieldArray } from 'formik';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getToken } from '../../services/tokenService';

//import './register.scss';

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
  //good_with: yup.string().required('Please enter street number and name')
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
  }

  async componentDidMount() {
    //console.log(this.props)
    const pet_id = this.props.match.params.id
    const response = await axios.get(`/pets/${pet_id}`);
    //console.log(response.data.data[0][0]);
    this.setState(response.data.data[0][0])
    console.log("state",this.state);
    }


  render() {
    //console.log("props", this.props)
    return (
      <>
      {this.state.name &&
          <div className="container">
            <div className="row">
              <div className="col-sm-2" />
              <div className="col-sm-8">
                <Formik
                  onSubmit={async values => {
                    //console.log("values",values.name);
                    //console.log(this.state)
                    try {
                      const token = getToken();
                      const id = this.state._id
                      const req = await axios.patch(`/pets/${id}`, values, {
                        headers: {
                          Authorization: `Bearer ${token}`
                        }
                      });
                      this.props.history.push('/me');

                      //   const response = await axios.post('/shelters/login', values);
                      //   const { data } = response.data;
                      //
                      //   setToken(data[0]);
                      //   // call redux action that fetches user and puts user in state
                      //   this.props.getShelterUser();
                      //   this.props.history.push('/');
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
                      <Form.Group>
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
                        <Form.Group controlId="exampleForm.ControlSelect1">
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
                        <Form.Group controlId="exampleForm.ControlSelect2">
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
                          rows="15"
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
                        <Form.Label>Photo:</Form.Label>
                        <Form.Control
                          type="text"
                          name="photo"
                          onChange={handleChange}
                          value={values.photo}
                        />
                        <Form.Group controlId="exampleForm.ControlSelect2">
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
                      </Form.Group>
                      <Button variant="dark" type="submit">
                        Edit!
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        }
      </>
    );
  }
}
// export default connect(mapStateToProps, { getMyDogs })(EditPet);
function mapStateToProps(state) {
  console.log('here', state);
  return {
    dog_detail: state.dog_detail
  };
}

export default withRouter(connect(mapStateToProps, null)(EditPet));
