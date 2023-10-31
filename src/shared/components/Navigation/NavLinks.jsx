import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/attend">Attend</NavLink>
      </li>
      <li>
        <NavLink to="/kru">Attendance</NavLink>
      </li>
      <li>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/wfh">WFH</NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.isAdmin && (
        <li>
          <NavLink to="/create-meeting">Create Meeting</NavLink>
        </li>
      )}
      {!auth.isLoggedIn ? (
        <li>
          <NavLink to="/auth">Sign In</NavLink>
        </li>
      ) : (
        <li>
          <NavLink to="/logout" onClick={auth.logout}>
            Logout
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
