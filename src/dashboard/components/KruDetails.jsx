import React from "react";
import "./KruDetails.css";
import KruProfile from "./KruProfile";
import KruAttendanceSummary from "./KruAttendanceSummary";

const KruDetails = (props) => {

  return (
    <div className="card kru-details">
      <h3>Kru Details</h3>
      <KruProfile {...props} />
      <hr></hr>
      <KruAttendanceSummary {...props}/>
    </div>
  );
};

export default KruDetails;
