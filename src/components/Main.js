import React, { Component } from "react";
import axios from "axios";

import Project from "./Project";
import Item from "./Item";

import { ListGroup, Row, Col } from "reactstrap";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      projects: {},
      items: {},
      activeProject: null
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
    const { activeProject } = this.state;

    axios
      .get(
        `${
          process.env.REACT_APP_DEV_API_URL
        }/api/v1/projects/${activeProject}/items`
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
    this.setState({ activeProject: id });
  };

  render() {
    const { projects, items } = this.state;

    return (
      <Row className="mt-5">
        <Col>
          <h5>Projects</h5>
          <ListGroup>
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
          <h5>Items</h5>
          <ListGroup>
            {Object.keys(items).map(key => {
              return <Item key={key} item={items[key]} />;
            })}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

export default Main;
