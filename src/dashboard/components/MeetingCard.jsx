import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

import "./MeetingCard.css";

// convert date to "Friday", dd/mm/yy
function formatDateToDdMmYy(date) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dayName = days[date.getDay()];
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to month because it's zero-based
  const year = date.getFullYear().toString().slice(-2); // Extract the last two digits of the year
  return `${dayName}, ${day}/${month}/${year}`;
}

// get hour and minute in hh:mm format
function formatTimeToMmSs(time) {
  const hour = time.getHours().toString().padStart(2, "0");
  const minute = time.getMinutes().toString().padStart(2, "0");
  return `${hour}:${minute}`;
}

const MeetingCard = ({ date, lateTime, attendedAt }) => {
  return (
    <div className="card meeting-card">
      <div className="meeting-card-body card-body">
        <div className="time">
          <div className="meeting-card-item">
            <AiOutlineClockCircle className="meeting-card-icon" />
            <div className="meeting-card-text">
              {formatDateToDdMmYy(new Date(date))}
            </div>
          </div>
          {lateTime > 0 ? (
            <div className="late-indicator late meeting-card-item ">late</div>
          ) : (
            <div className="late-indicator not-late meeting-card-item">
              on time
            </div>
          )}
        </div>

        <div className="meeting-card-item schedule">
          <div>Scheduled</div>
          <div>{formatTimeToMmSs(new Date(date))}</div>
        </div>
        <div className="meeting-card-item schedule">
          <div>Attended</div>
          <div>{formatTimeToMmSs(new Date(attendedAt))}</div>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
