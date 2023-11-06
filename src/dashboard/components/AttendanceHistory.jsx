import React from "react";

import MeetingCard from "./MeetingCard";
import "./AttendanceHistory.css";

const AttendanceHistory = ({ meetingsAttendedData, allMeetingsData }) => {
  const meetings = Object.values(meetingsAttendedData);
  // create array three times meeting
  // const threeMeetings = meetings.concat(meetings, meetings);
  return (
    <div className="attendance-history card">
      <h4 className="card-title">Attendance History</h4>
      <div className="meeting-card-wrapper ">
        {allMeetingsData.map((meeting, i) => {
          
          if(meetings.some(e => e._id === meeting._id)){
            return <MeetingCard key={i} {...meeting} />;
          }
          else{
            return <MeetingCard key={i} {...meeting} unAttended={true}/>;
          }
        })}
      </div>
    </div>
  );
};

export default AttendanceHistory;
