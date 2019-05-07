import React from "react";

import { ListGroupItem } from "reactstrap";

const Item = props => {
  const { item, selectItem } = props;
  return (
    <ListGroupItem
      color={item.completed ? "success" : ""}
      tag="button"
      action
      onClick={event => {
        event.preventDefault();

        selectItem(item.id);
      }}
    >
      <span>{item.description}</span>
    </ListGroupItem>
  );
};

export default Item;
