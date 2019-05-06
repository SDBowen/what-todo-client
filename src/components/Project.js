import React from "react";

import { ListGroupItem } from "reactstrap";

const Project = props => {
  const { project, selectProject } = props;
  return (
    <ListGroupItem
      tag="button"
      action
      onClick={event => {
        event.preventDefault();

        selectProject(project.id);
      }}
    >
      <span>{project.title}</span>
    </ListGroupItem>
  );
};

export default Project;
