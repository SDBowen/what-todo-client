import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { isAuthenticated, setAuthHeader } from "./Auth";

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
    this.setState({ isAuthenticated: isAuthenticated() });
  };

  login = user => {
    axios
      .post(`${process.env.REACT_APP_DEV_API_URL}/api/v1/auth`, user)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("whatTodoJwt", token);

        setAuthHeader(token);
      })
      .catch(error => {
        return error;
      });
  };

  render() {
    const { isAuthenticated, email, password } = this.state;

    if (isAuthenticated === true) {
      return <Redirect to="/app" />;
    } else {
      return (
        <div>
          <p>Login</p>
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
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      );
    }
  }
}

export default Login;
