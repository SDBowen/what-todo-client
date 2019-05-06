import React from "react";

import { ListGroupItem } from "reactstrap";

const Item = props => {
  const { item } = props;
  return (
    <ListGroupItem tag="button" action>
      <span>{item.description}</span>
    </ListGroupItem>
  );
};

export default Item;
