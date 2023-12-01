import React from "react";
import { NavLink } from "react-router-dom";
import { FaTrophy } from "react-icons/fa6";


const LeaderBoardCard = ({
  _id,
  name,
  rank,
  totalMeetingsAttended,
  totalLateMeetingsAttended,
  image,
}) => {
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
        <NavLink to={`/dashboard/${_id}`} className="profile-nav-link">
          <img
            src={`http://localhost:5000/${image}`}
            alt="profile"
            className="profile-image"
          />
          <div>{name}</div>
        </NavLink>
        <div className="meeting-attended-wrapper">
          <div className="total-late-meeting-attended">
            {totalLateMeetingsAttended}
          </div>
          <div className="total-meeting-attended">{totalMeetingsAttended}</div>
        </div>
      </div>
    </li>
  );
};

export default LeaderBoardCard;
