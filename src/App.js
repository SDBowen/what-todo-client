import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import NewProject from "./components/NewProject";
import NewItem from "./components/NewItem";
import EditProject from "./components/EditProject";
import EditItem from "./components/EditItem";

import { Container } from "reactstrap";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          <Navigation />
          <div>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Main} />
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
