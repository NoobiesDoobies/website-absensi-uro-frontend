import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";

const ProfileDropDown = ({ image, onLogout }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const auth = useContext(AuthContext);

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  }

  return (
    <div className="mr-2">
      {!isDropDownOpen ? (
        <div className="  bg-cream-yellow rounded-lg flex flex-col w-24">
          <button
            onClick={toggleDropDown}
            type="button"
            className="p-2 flex flex-row items-center justify-center"
          >
            <img
              src={`http://localhost:5000/${image}`}
              className=" w-10 h-10 rounded-full object-cover mr-2"
            />
            <FaArrowDown className="text-dark-blue" />
          </button>
        </div>
      ) : (
        <div className=" bg-cream-yellow rounded-t-lg flex flex-col w-24">
          <button
            onClick={toggleDropDown}
            type="button"
            className=" p-2 flex flex-row items-center justify-center"
          >
            <img
              src={`http://localhost:5000/${image}`}
              className=" w-10 h-10 rounded-full object-cover mr-2"
            />
            {isDropDownOpen ? (
              <FaArrowUp className="text-dark-blue" />
            ) : (
              <FaArrowDown className="text-dark-blue" />
            )}
          </button>
          <div className=" bg-cream-yellow rounded-b-lg my-14 fixed flex flex-col flex-1 w-24 ">
            <NavLink
              to={`/update-profile`}
              className="block py-2 text-sm text-dark-blue hover:bg-light-blue hover:text-white text-start px-2"
              onClick={toggleDropDown}
            >
              Profile
            </NavLink>
            <button
              onClick={onLogout}
              className="block py-2 text-sm text-dark-blue hover:bg-light-blue hover:text-white text-start px-2 rounded-b-lg"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )

};

export default ProfileDropDown;
