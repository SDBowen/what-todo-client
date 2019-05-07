import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

import { setAuthHeader } from "./Auth";

class Navigation extends Component {
  logoutUser = () => {
    localStorage.removeItem("whatTodoJwt");

    setAuthHeader(false);
  };

  render() {
    return (
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
            <NavLink tag={Link} to="/" onClick={this.logoutUser}>
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Navigation;
