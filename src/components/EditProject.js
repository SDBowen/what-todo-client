import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { Row, Button } from "reactstrap";

class EditProject extends Component {
  constructor() {
    super();
    this.state = {
      title: null,
      errors: {},
      redirect: false
    };
  }

  componentDidMount() {
    this.setProject();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { title } = this.state;

    const updatedProject = {
      title
    };

    this.editProject(updatedProject);
  };

  editProject = data => {
    const { id } = this.props.location.state.project;

    axios
      .put(`${process.env.REACT_APP_DEV_API_URL}/api/v1/projects/${id}`, data)
      .then(res => {
        this.setState({ redirect: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  setProject = () => {
    const { title } = this.props.location.state.project;

    this.setState({
      title
    });
  };

  handleDelete = e => {
    e.preventDefault();

    const { id } = this.props.location.state.project;

    axios
      .delete(`${process.env.REACT_APP_DEV_API_URL}/api/v1/projects/${id}`)
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
            <h3>Edit project</h3>
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
                  Update
                </Button>
                <Button
                  outline
                  className="ml-2"
                  color="danger"
                  onClick={this.handleDelete}
                >
                  Delete
                </Button>
              </Row>
            </form>
          </Row>
        </div>
      );
    }
  }
}

export default EditProject;
