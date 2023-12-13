import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

const Profile = ({ image, name, position, division, generation }) => {
  return (
    <div className="py-6 flex">
      <img
        src={`http://localhost:5000/${image}`}
        alt="profile"
        className="w-16 h-16 rounded-full object-cover mr-2"
      />

      <div className="flex flex-col items-start justify-center pl-2">
        <h3 className="font-bold">{name}</h3>
        <h3 className="text-sm">
          {position}, {division} {generation}
        </h3>
      </div>
    </div>
  );
};

export default Profile;
