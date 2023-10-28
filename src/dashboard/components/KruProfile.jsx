import React from "react";
import "./KruProfile.css";

const KruProfile = ({ name, image, position, email, generation }) => {
  return (
    <div className="profile">
      
      <div className="profile-image" >
        <img
          src={image}
          alt={name}
        />
      </div>

      <div className="profile-details">
        <h4 className="profile-name">{name}</h4>
        <div className="profile-wrapper">
          <div className="profile-detail">
            <p>Generation</p>
            <p>{generation}</p>
          </div>
          <div className="profile-detail">
            <p>Role</p>
            <p>{position}</p>
          </div>
          <div className="profile-detail">
            <p>Email Address</p>
            <p>{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KruProfile;
