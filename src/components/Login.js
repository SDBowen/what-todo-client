import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { isAuthenticated, setAuthHeader } from "./Auth";

import { Row, Button } from "reactstrap";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      isAuthenticated: false
    };
  }

  componentDidMount() {
    this.setState({ isAuthenticated: isAuthenticated() });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { email, password } = this.state;

    event.preventDefault();

    const data = {
      email,
      password
    };

    this.login(data);
  };

  login = user => {
    axios
      .post(`${process.env.REACT_APP_DEV_API_URL}/api/v1/auth`, user)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("whatTodoJwt", token);

        setAuthHeader(token);

        this.setState({ isAuthenticated: isAuthenticated() });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { isAuthenticated, email, password } = this.state;

    if (isAuthenticated === true) {
      return <Redirect to="/app" />;
    } else {
      return (
        <div>
          <Row className="justify-content-center mt-5">
            <h3>Login</h3>
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
              <Row className="justify-content-center mt-3">
                <Button outline color="secondary">
                  Login
                </Button>
              </Row>
            </form>
          </Row>
        </div>
      );
    }
  }
}

export default Login;
