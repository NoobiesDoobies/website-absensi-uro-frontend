import React from "react";

import MeetingCard from "./MeetingCard";
import "./AttendanceHistory.css";

const AttendanceHistory = (props) => {
  const meetings = Object.values(props);
  // create array three times meeting
  const threeMeetings = meetings.concat(meetings, meetings);
  return (
    <div className="attendance-history card">
      <h4 className="card-title">Attendance History</h4>
      <div className="meeting-card-wrapper ">
        {threeMeetings.map((meeting, i) => {
          return <MeetingCard key={i} {...meeting}/>;
        })}
      </div>

    </div>
  );
};

export default AttendanceHistory;
