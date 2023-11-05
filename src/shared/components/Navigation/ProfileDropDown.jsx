import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { AuthContext } from "../../context/AuthContext";
import "./ProfileDropDown.css";
import "../Navigation/NavLinks.css";

const ProfileDropDown = ({ imageURL, dropDownOptions }) => {
  const auth = useContext(AuthContext);
  const [showDropDown, setShowDropDown] = useState(false);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const dropDownItemComponent = dropDownOptions.map((option, i) => {

    return (
      <NavLink className="dropdown-item" key={i} to={option.to}>
        {option.text}
      </NavLink>
    );
  });

  const dropDownMenu = (
    <button onClick={toggleDropDown} className="dropdown-menus" aria-labelledby="dropdownMenuButton">
      {dropDownItemComponent}
    </button>
  );

  return (
    <div className="profile-drop-down__wrapper">
      <div className="profile-drop-down__profile-image-container">
        <button
          className="btn btn-transparent dropdown-toggle "
          onClick={toggleDropDown}
        >
          <img
            src={imageURL}
            className="profile-drop-down__title__profile-image"
          ></img>
        </button>
      </div>
      {showDropDown && dropDownMenu}
    </div>
  );
};

export default ProfileDropDown;
