import React from "react";
import "./KruAttendanceSummary.css"
const KruAttendanceSummary = ({ meetingsAttended }) => {
  console.log(meetingsAttended)
  let averageLateTime = 0;
  meetingsAttended.forEach((meeting) => {
    averageLateTime += meeting.lateTime;
  });
  averageLateTime /= meetingsAttended.length;


  return (
    <div className="card attendance-summary-wrapper">
        <div className="attendance-summary-property">
          <p>Total Attendance</p>
          <p>{meetingsAttended.length}</p>
        </div>
        <div className="attendance-summary-property">
          <p>Total Unattended</p>
          <p>{meetingsAttended.length}</p>
        </div>
        <div className="attendance-summary-property">
          <p>Average Late Time</p>
          <p>{averageLateTime} mins</p>
        </div>
    </div>
  );
};

export default KruAttendanceSummary;
