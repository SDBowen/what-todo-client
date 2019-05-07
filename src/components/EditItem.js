import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { Row, Button } from "reactstrap";

class EditItem extends Component {
  constructor() {
    super();
    this.state = {
      description: null,
      completed: null,
      errors: {},
      redirect: false
    };
  }

  componentDidMount() {
    this.setItem();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onCheck = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  onSubmit = event => {
    event.preventDefault();
    const { description, completed } = this.state;

    const updatedItem = {
      description,
      completed
    };

    this.editItem(updatedItem);
  };

  editItem = data => {
    const { item } = this.props.location.state;

    axios
      .put(
        `${process.env.REACT_APP_DEV_API_URL}/api/v1/projects/${
          item.project_id
        }/items/${item.id}`,
        data
      )
      .then(res => {
        this.setState({ redirect: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  setItem = () => {
    const { description, completed } = this.props.location.state.item;

    this.setState({
      description,
      completed
    });
  };

  handleDelete = e => {
    e.preventDefault();

    const { item } = this.props.location.state;

    axios
      .delete(
        `${process.env.REACT_APP_DEV_API_URL}/api/v1/projects/${
          item.project_id
        }/items/${item.id}`
      )
      .then(res => {
        this.setState({ redirect: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { description, completed, redirect } = this.state;

    if (redirect === true) {
      return <Redirect to="/app" />;
    } else {
      return (
        <div>
          <Row className="justify-content-center mt-5">
            <h3>Edit item</h3>
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
              <div className="mt-2">
                <label htmlFor="complete">
                  Completed?
                  <input
                    className="ml-2"
                    type="checkbox"
                    name="completed"
                    checked={completed}
                    onChange={this.onCheck}
                  />
                </label>
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

export default EditItem;
