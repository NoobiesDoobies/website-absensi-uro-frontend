import React from "react";

import "./ScheduleCard.css";
function formatDateToDdMmYy(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because it's zero-based
    const year = date.getFullYear().toString().slice(-2); // Extract the last two digits of the year
    return `${day}/${month}/${year}`;
  }

const ScheduleCard = ({division, day, dateEnd, hour, minute}) => {
  return(
    <div className="card schedule-card">
        <div className="card-body">
            {day}
        </div>
        <div className="card-body">
            {`${hour}:${minute}`}
        </div>
 
        <div className="card-body">
            {division.join(", ")}
        </div>

        <div className="card-body">
            Date End: {formatDateToDdMmYy(new Date(dateEnd))}
        </div>

        
    </div>
  );
};

export default ScheduleCard;