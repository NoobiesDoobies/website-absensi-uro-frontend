import React from "react";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import { AiFillClockCircle } from "react-icons/ai";

// convert date to 12 October 2003
const convertDate = (dateObj) => {
  const month = dateObj.toLocaleString("default", { month: "long" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year}`;
};

const ProfileSummary = ({
  name,
  position,
  email,
  meetings,
  imageURL,
  dateOfBirth
}) => {
  let averageLateTime = 0;
  const totalAttendance = meetings.length;
  meetings.map((meeting) => {
    if (meeting.lateTime > 0) {
      averageLateTime += meeting.lateTime;
    }
  });

  averageLateTime = averageLateTime / meetings.length / 60; // convert to mins
  averageLateTime = averageLateTime.toFixed(2);
  averageLateTime = averageLateTime === "NaN" ? 0 : averageLateTime;
  return (
    <div className="card profile-summary">
      <h4 className="profile-summary-title card-title">Profile Summary</h4>
      <div className="profile-body">
        <div className="profile">
          <div className="profile-image-container">
            <img src={imageURL} alt="profile" className="profile-images" />
          </div>
          <div className="profile-name">{name}</div>
          <div className="profile-detail">
            <div className="profile-detail-item">{`${position}, ${convertDate(new Date(dateOfBirth))}`}</div>

          </div>
        </div>

        <div className="attendance-summary">
          <div className="card attendance-summary-card">
            <div className="attendance-summary-icon-wrapper">
              <FaPersonWalkingArrowRight className="attendance-summary-icon" />
            </div>
            <div className="attendance-summary-stats">Total Attendance</div>
            <div className="attendance-summary-stats">{totalAttendance}</div>
          </div>
          <div className="card attendance-summary-card">
            <div className="attendance-summary-icon-wrapper">
              <AiFillClockCircle className="attendance-summary-icon" />
            </div>
            <div className="attendance-summary-stats">Average late</div>
            <div className="attendance-summary-stats">
              {averageLateTime} mins
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
