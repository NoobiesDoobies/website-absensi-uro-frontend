import React from "react";

import MeetingCard from "./MeetingCard";
import "./AttendanceHistory.css";

const AttendanceHistory = ({ meetingsAttendedData, allMeetingsData }) => {
  const meetings = Object.values(meetingsAttendedData);
  // create array three times meeting
  // const threeMeetings = meetings.concat(meetings, meetings);
  allMeetingsData.forEach((meeting) => {
    const matchingId = meetingsAttendedData.find((m) => m.id === meeting.id);

    if (matchingId) {
      meeting.lateTime = matchingId.lateTime;
      meeting.attendedAt = matchingId.attendedAt;
      meeting.isAttended = true;
    }else{
      meeting.lateTime = null;
      meeting.attendedAt = null;
      meeting.isAttended = false;
    }
  });
  return (
    <div className="attendance-history card">
      <h4 className="card-title">Attendance History</h4>
      <div className="meeting-card-wrapper ">
        {allMeetingsData.map((meeting, i) => {
          return <MeetingCard key={i} {...meeting} />;
        })}
      </div>
    </div>
  );
};

export default AttendanceHistory;
