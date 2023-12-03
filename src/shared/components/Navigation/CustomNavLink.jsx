import React from "react";
import { FaPlay } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const CustomNavLink = ({ to, text }) => {
  return (
    <li className="my-2">
      <NavLink to={to} className="flex flex-row justify-between items-center pr-3">
        {text}
        <FaPlay className="play-icon" />
      </NavLink>
    </li>
  );
};

export default CustomNavLink;
