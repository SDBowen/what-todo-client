import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import NewProject from "./components/NewProject";
import NewItem from "./components/NewItem";
import EditProject from "./components/EditProject";
import EditItem from "./components/EditItem";

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
            <NavbarBrand href="/app">What Todo</NavbarBrand>
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
            <PrivateRoute exact path="/project" component={NewProject} />
            <PrivateRoute exact path="/item" component={NewItem} />
            <PrivateRoute exact path="/edit-project" component={EditProject} />
            <PrivateRoute exact path="/edit-item" component={EditItem} />
          </div>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
