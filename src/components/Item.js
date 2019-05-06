import React from "react";

const Item = props => {
  const { item } = props;
  return (
    <li>
      <span>{item.description}</span>
    </li>
  );
};

export default Item;
