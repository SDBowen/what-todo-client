import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { Row, Button } from "reactstrap";

class NewItem extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      errors: {},
      redirect: false
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { description } = this.state;

    event.preventDefault();

    const data = {
      description
    };

    this.createItem(data);
  };

  createItem = item => {
    const { projectId } = this.props.location.state;

    axios
      .post(
        `${
          process.env.REACT_APP_DEV_API_URL
        }/api/v1/projects/${projectId}/items`,
        item
      )
      .then(res => {
        this.setState({ redirect: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { description, redirect } = this.state;

    if (redirect === true) {
      return <Redirect to="/app" />;
    } else {
      return (
        <div>
          <Row className="justify-content-center mt-5">
            <h3>Add a new item</h3>
          </Row>
          <Row className="justify-content-center mt-3">
            <form onSubmit={this.onSubmit}>
              <div>
                <input
                  type="text"
                  name="description"
                  placeholder="Item description"
                  value={description}
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

export default NewItem;
