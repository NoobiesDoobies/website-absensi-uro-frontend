import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/kru">Attendance</NavLink>
      </li>
      <li>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
      </li>
      <li>
        <NavLink to="/wfh">WFH</NavLink>
      </li>
      <li>
        <NavLink to="/auth">Sign In</NavLink>
      </li>
      <li>
        <NavLink to="/create-meeting">Create Meeting</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
