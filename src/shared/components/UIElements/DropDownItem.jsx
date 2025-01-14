import React from "react";

function DropdownItem(props) {
  return (
    <a href="#" className="menu-item" onClick={() => props.goToMenu}>
      <span className="icon-button">{props.leftIcon}</span>
      {props.children}
      <span className="icon-right">{props.rightIcon}</span>
    </a>
  );
}

export default DropdownItem;
