import React from "react";

import MeetingCard from "./MeetingCard";
import "./AttendanceHistory.css";

const AttendanceHistory = (props) => {
  const meetings = Object.values(props);
  const slicedMeetings = meetings.slice(0, 6);
  return (
    <div className="attendance-history card">
      <h4 className="card-title">Attendance History</h4>
      <div className="meeting-card-wrapper ">
        {meetings.map((meeting, i) => {
          return <MeetingCard key={i} {...meeting}/>;
        })}
      </div>
      <div className="attendance-history-footer">
        <a href="/meetings">View all</a>
      </div>
    </div>
  );
};

export default AttendanceHistory;
