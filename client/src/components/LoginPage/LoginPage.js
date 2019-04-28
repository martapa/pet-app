// Import external dependencies
import React, { Component } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
//
// // Import local dependencies
// import './login.scss';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
    this.debounceChange = debounce(this.handleChange, 300);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (id, value) => {
    this.setState({ [id]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      const response = await axios.post(
        '/shelters/login',
        {
          email: email,
          password: password
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <div className="container login">
          <div className="row">
            <div className="col">
              <div className="form-container">
                <h1>Log In</h1>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      onChange={({ target: { id, value } }) => {
                        this.debounceChange(id, value);
                      }}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={({ target: { id, value } }) => {
                        this.debounceChange(id, value);
                      }}
                    />
                  </div>
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="remember-me"
                    />
                    <label className="form-check-label" htmlFor="remember-me">
                      Remember me
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

// Module exports
export default LoginPage;
