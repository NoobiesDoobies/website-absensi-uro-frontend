import React from "react";

import "./MeetingCard.css";
function formatDateToDdMmYy(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to month because it's zero-based
  const year = date.getFullYear().toString().slice(-2); // Extract the last two digits of the year
  return `${day}/${month}/${year}`;
}

// get hh:mm from date
function formatDateToHhMm(date) {
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${hour}:${minute}`;
}

const ScheduleCard = ({ date, division, id, title, onDelete, onEdit}) => {
  return (
    <>
      <div className="meeting-card card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {formatDateToDdMmYy(new Date(date))}
          </h6>
            <p className="card-text">{formatDateToHhMm(new Date(date))}</p>
          <p className="card-text">{division.join(", ")}</p>
        </div>
        <div className="button-wrapper">
            <button className="btn btn-danger" onClick={()=>{onDelete(id)}}>Delete</button>
            <button className="btn btn-primary" onClick={()=>{onEdit(id)}}>Edit</button>
        </div>
      </div>
    </>
  );
};

export default ScheduleCard;
