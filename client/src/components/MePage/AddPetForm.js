import React, { Component } from 'react';
import { debounce } from 'lodash';
import { Form, Button, Col } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik, FieldArray  } from 'formik';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { getToken } from '../../services/tokenService';

//import './register.scss';

//const phoneRegEx =
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
  { id: "dogs", name: "dogs" },
  { id: "cats", name: "cats" },
  { id: "children", name: "children" }
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
      good_with:''
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-2" />
          <div className="col-sm-8">
            <Formik
              validationSchema={schema}
              onSubmit={async values => {
                console.log(values);

                try {
                  const pet = {
                    name: values.name,
                    size: values.size,
                    age: values.age,
                    gender: values.gender,
                    photo: values.photo,
                    description: values.description,
                    is_adopted: values.is_adopted,
                    good_with:values.good_with
                  };
                  const token = getToken();
                  const post_pet = await axios.post('/pets', pet, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  });
                  console.log(post_pet);
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
                errors
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
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
                      isInvalid={!!errors.description && touched.description}
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
                        isInvalid={!!errors.is_adopted && touched.is_adopted}
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
                                  checked={values.good_with.includes(category.id)}
                                  onChange={e => {
                                    if (e.target.checked) arrayHelpers.push(category.id);
                                    else {
                                      const idx = values.good_with.indexOf(category.id);
                                      arrayHelpers.remove(idx);
                                    }
                                  }}
                                />{" "}
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    />



                  </Form.Group>
                  <Button variant="dark" type="submit">
                    Add Pet!
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(AddPetForm);