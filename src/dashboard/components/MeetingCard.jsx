import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";


// convert date to "Friday", dd/mm/yy
function formatDateToDdMmYy(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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

const MeetingCard = ({ date, lateTime, attendedAt, isAttended }) => {
  let lateIndicatorElement;
  if (!isAttended) {
    lateIndicatorElement = <div className="late-indicator unattended meeting-card-item">unattended</div>;
  } else if (lateTime > 0) {
    lateIndicatorElement = <div className="late-indicator late meeting-card-item ">late</div>;
  } else {
    lateIndicatorElement = <div className="late-indicator not-late meeting-card-item">on time</div>;
  }
  return (
    <div className="card meeting-card">
      <div className="meeting-card-body card-body">
        <div className="time">
          <div className="meeting-card-item meeting-card-date card">
            <AiOutlineClockCircle className="meeting-card-icon" />
            <div className="meeting-card-text">
              {formatDateToDdMmYy(new Date(date))}
            </div>
          </div>
          
          {lateIndicatorElement}
        </div>

        <div className="meeting-card-item schedule card">
          <div>Scheduled</div>
          <div>{formatTimeToMmSs(new Date(date))}</div>
        </div>
        <div className="meeting-card-item schedule card">
          <div>Attended</div>
          <div>{formatTimeToMmSs(new Date(attendedAt))}</div>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
