import React from "react";

const Project = props => {
  const { project, selectProject } = props;
  return (
    <li>
      <span>{project.title}</span>
      <button
        onClick={event => {
          event.preventDefault();

          selectProject(project.id);
        }}
      />
    </li>
  );
};

export default Project;
