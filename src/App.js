import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import PrivateRoute from "./components/PrivateRoute";

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">What Todo</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/register">
                  Register
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/">
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
          <div>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/app" component={Main} />
          </div>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
