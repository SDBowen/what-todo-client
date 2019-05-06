import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { Row, Button } from "reactstrap";

class NewProject extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      errors: {},
      redirect: false
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { title } = this.state;

    event.preventDefault();

    const data = {
      title
    };

    this.createProject(data);
  };

  createProject = project => {
    axios
      .post(`${process.env.REACT_APP_DEV_API_URL}/api/v1/projects`, project)
      .then(res => {
        this.setState({ redirect: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { title, redirect } = this.state;

    if (redirect === true) {
      return <Redirect to="/app" />;
    } else {
      return (
        <div>
          <Row className="justify-content-center mt-5">
            <h3>Add a new project</h3>
          </Row>
          <Row className="justify-content-center mt-3">
            <form onSubmit={this.onSubmit}>
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Project title"
                  value={title}
                  onChange={this.onChange}
                />
              </div>
              <Row className="justify-content-center mt-3">
                <Button outline color="secondary">
                  Submit
                </Button>
              </Row>
            </form>
          </Row>
        </div>
      );
    }
  }
}

export default NewProject;
