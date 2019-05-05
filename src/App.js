import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="">
            <ul>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/app" component={Main} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
