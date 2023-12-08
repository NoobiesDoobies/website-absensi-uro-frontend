import React from "react";
import { NavLink } from "react-router-dom";
import { FaTrophy } from "react-icons/fa6";

const LeaderBoardCard = ({
  _id,
  name,
  rank,
  points,
  image,
  key,
}) => {
  let rankComponent;

  if (rank === 1) {
    rankComponent = <FaTrophy className="text-gold" />;
  } else if (rank === 2) {
    rankComponent = <FaTrophy className="text-silver" />;
  } else if (rank === 3) {
    rankComponent = <FaTrophy className="text-bronze" />;
  } else {
    rankComponent = <div className="rank">{rank}</div>;
  }

  return (
    <div className="flex flex-row border-2 border-slate-200 rounded-lg items-center my-2 p-1">
      <div className="ml-2 mr-5 text-xl">{rankComponent}</div>
      <NavLink
        to={`/dashboard/${_id}`}
        className="flex flex-row justify-center items-center mr-2"
      >
        <img
          src={`http://localhost:5000/${image}`}
          alt="profile"
          className="rounded-full w-10 h-10 object-cover object-to mr-2"
        />
        <div>{name}</div>
      </NavLink>
      <div className="flex flex-1 flex-row items-center justify-end">
        <div className="mr-4 text-center">{points}</div>
      </div>

    </div>
  );
};

export default LeaderBoardCard;
