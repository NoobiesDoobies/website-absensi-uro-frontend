import React from "react";
import { NavLink } from "react-router-dom";
import { FaTrophy } from "react-icons/fa6";

import "./LeaderBoardCard.css";

const LeaderBoardCard = ({ id, name, rank, meetingsAttended }) => {
  const totalMeetingAttended = meetingsAttended.length;

  let rankComponent;

  if (rank === 1) {
    rankComponent = <FaTrophy className="trophy rank-1" />;
  } else if (rank === 2) {
    rankComponent = <FaTrophy className="trophy rank-2" />;
  } else if (rank === 3) {
    rankComponent = <FaTrophy className="trophy rank-3" />;
  } else {
    rankComponent = <div className="rank">{rank}</div>;
  }

  return (
    <li className="leaderboard-card card">
      <div className="leaderboard-card-body card-body">
        {rankComponent}
        <NavLink to={`/dashboard/${id}`} className="profile-nav-link">
          {name}
        </NavLink>
        <div className="total-meeting-attended">{totalMeetingAttended}</div>
      </div>
    </li>
  );
};

export default LeaderBoardCard;
