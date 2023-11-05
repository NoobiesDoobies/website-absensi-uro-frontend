import React from "react";

import MeetingCard from "./MeetingCard";
import "./AttendanceHistory.css";

const AttendanceHistory = (props) => {
  const meetings = Object.values(props);
  return (
    <div className="attendance-history card">
      <h4 className="card-title">Attendance History</h4>
      <div className="meeting-card-wrapper card-body">
        {meetings.map((meeting, i) => {
          return <MeetingCard key={i} {...meeting}/>;
        })}
      </div>
    </div>
  );
};

export default AttendanceHistory;
