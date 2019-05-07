import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Project from "./Project";
import Item from "./Item";

import { ListGroup, Row, Col, Button } from "reactstrap";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      projects: {},
      items: {},
      activeProject: null,
      activeItem: null,
      newProject: false,
      newItem: false,
      editProject: false,
      editItem: false
    };
  }

  componentDidMount() {
    this.getProjects();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { activeProject } = this.state;

    if (activeProject !== prevState.activeProject) {
      this.getItems();
    }
  }

  getProjects = () => {
    axios
      .get(`${process.env.REACT_APP_DEV_API_URL}/api/v1/projects`)
      .then(res => {
        const projects = res.data.data;

        this.setState({ projects });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getItems = () => {
    const { activeProject, projects } = this.state;
    const projectId = projects[activeProject].id;

    axios
      .get(
        `${
          process.env.REACT_APP_DEV_API_URL
        }/api/v1/projects/${projectId}/items`
      )
      .then(res => {
        const items = res.data.data;
        this.setState({ items });
      })
      .catch(error => {
        console.log(error);
      });
  };

  selectProject = id => {
    const { projects } = this.state;

    Object.keys(projects).forEach(key => {
      if (this.state.projects[key].id === id) {
        this.setState({ activeProject: key });
      }
    });
  };

  selectItem = id => {
    const { items } = this.state;

    Object.keys(items).forEach(key => {
      if (this.state.items[key].id === id) {
        this.setState({ activeItem: key });
      }
    });
  };

  render() {
    const {
      projects,
      items,
      newProject,
      newItem,
      activeProject,
      activeItem,
      editProject,
      editItem
    } = this.state;

    if (newProject === true) {
      return <Redirect to="/project" />;
    }
    if (editProject === true && activeProject) {
      return (
        <Redirect
          to={{
            pathname: "/edit-project",
            state: { project: projects[activeProject] }
          }}
        />
      );
    }
    if (newItem === true && activeProject) {
      return (
        <Redirect
          to={{
            pathname: "/item",
            state: { projectId: projects[activeProject].id }
          }}
        />
      );
    }
    if (editItem === true && activeItem) {
      return (
        <Redirect
          to={{
            pathname: "/edit-item",
            state: { item: items[activeItem] }
          }}
        />
      );
    } else {
      return (
        <Row className="mt-5">
          <Col>
            <Row className="justify-content-center">
              <h5 className="mr-3">Projects</h5>
              <Button
                size="sm"
                onClick={event => {
                  event.preventDefault();
                  this.setState({ newProject: true });
                }}
              >
                new
              </Button>
              <Button
                className="ml-1"
                size="sm"
                onClick={event => {
                  event.preventDefault();
                  this.setState({ editProject: true });
                }}
              >
                edit
              </Button>
            </Row>
            <ListGroup className="mt-3">
              {Object.keys(projects).map(key => {
                return (
                  <Project
                    key={key}
                    project={projects[key]}
                    selectProject={this.selectProject}
                  />
                );
              })}
            </ListGroup>
          </Col>

          <Col>
            <Row className="justify-content-center">
              <h5 className="mr-3">Items</h5>
              <Button
                size="sm"
                onClick={event => {
                  event.preventDefault();
                  this.setState({ newItem: true });
                }}
              >
                add
              </Button>
              <Button
                className="ml-1"
                size="sm"
                onClick={event => {
                  event.preventDefault();
                  this.setState({ editItem: true });
                }}
              >
                edit
              </Button>
            </Row>
            <ListGroup className="mt-3">
              {Object.keys(items).map(key => {
                return (
                  <Item
                    key={key}
                    item={items[key]}
                    selectItem={this.selectItem}
                  />
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      );
    }
  }
}

export default Main;
