import React from "react";

import Menu from "./Menu.js";
import Button from "../../shared/components/FormElements/Button";
// import "./PlaceList.css";

const MenuList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <h2>No menu found. Maybe create one?</h2>
        <Button to="/createMenu">Create menu</Button>
      </div>
    );
  }

  return (
    <ul className="menu-list">
      {props.items.map((menu) => (
        <Menu
          key={menu.id}
          id={menu.id}
          title={menu.category}
          creatorId={menu.user}
          //   onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default MenuList;
