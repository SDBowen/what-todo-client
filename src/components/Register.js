import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { Row, Button } from "reactstrap";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      passwordTwo: "",
      redirect: false,
      errors: {}
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { email, password, passwordTwo } = this.state;

    event.preventDefault();

    const data = {
      email,
      password,
      password_confirmation: passwordTwo
    };

    this.register(data);
  };

  register = user => {
    axios
      .post(`${process.env.REACT_APP_DEV_API_URL}/api/v1/users`, user)
      .then(res => {
        this.setState({ redirect: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { email, password, passwordTwo, redirect } = this.state;

    if (redirect === true) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div>
          <Row className="justify-content-center mt-5">
            <h3>Register</h3>
          </Row>
          <Row className="justify-content-center mt-3">
            <form onSubmit={this.onSubmit}>
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.onChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.onChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="passwordTwo"
                  placeholder="Confirm password"
                  value={passwordTwo}
                  onChange={this.onChange}
                />
              </div>
              <Row className="justify-content-center mt-3">
                <Button outline color="secondary">
                  Register
                </Button>
              </Row>
            </form>
          </Row>
        </div>
      );
    }
  }
}

export default Register;
