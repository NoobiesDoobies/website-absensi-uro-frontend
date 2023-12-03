import React, { useContext } from "react";

import AttendanceSummaryStats from "../../../user/components/AttendanceSummaryStats";
import CustomNavLink from "./CustomNavLink";
import { AuthContext } from "../../context/AuthContext";


const NavLinks = (props, meetingData) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="font-bold text-xl my-10">
      <CustomNavLink to="/dashboard" text="Dashboard" />
      <AttendanceSummaryStats/>
      <CustomNavLink to="/leaderboard" text="Leaderboard" />
      <CustomNavLink to="wfh" text="WFH" />
      <CustomNavLink to="/meeting-schedules" text="Meeting Schedules" />
      {/* 
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
      {auth.isLoggedIn && auth.isAdmin && (
        <li>
          <NavLink to="/meeting-schedules">Meeting Schedules</NavLink>
        </li>
      )}

      {auth.isLoggedIn && auth.isAdmin && (
        <li>
          <NavLink to="/meetings">Meetings</NavLink>
        </li>
      )}

      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Sign In</NavLink>
        </li>
      )} */}
    </ul>
  );
};

export default NavLinks;
