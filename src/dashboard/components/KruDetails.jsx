import React from "react";
import "./KruDetails.css";
import KruProfile from "./KruProfile";
import KruAttendanceSummary from "./KruAttendanceSummary";

const KruDetails = (props) => {
  const krus = [
    {
      id: "u1",
      name: "Carlios",
      email: "carlioseryan20@gmail.com",
      image: "https://i.imgur.com/7yUvePI.jpg",
      position: "Ketua",
      generation: 14,
      meetingsAttended: [
        {
          id: "m1",
          title: ["Ngoprek"],
          date: new Date(),
          createdAt: new Date(),
          createdBy: "u2",
          attendees: ["u1", "u2"],
          attendedAt: new Date().setHours(new Date().getHours() + 1),
          lateTime: 123,
        },
      ],
    },
    {
      id: "u2",
      name: "Rizky",
      email: "rizky@gmail.com",
      image: "https://i.imgur.com/7yUvePI.jpg",
      position: "Wakil Ketua",
      generation: 14,
      meetingsAttended: [
        {
          id: "m1",
          title: ["Ngoprek"],
          date: new Date(),
          createdAt: new Date(),
          createdBy: "u2",
          attendees: ["u1", "u2"],
          attendedAt: new Date().setHours(new Date().getHours() + 1),
          lateTime: 123,
        },
        {
          id: "m2",
          title: ["Ngoprek"],
          date: new Date(),
          createdAt: new Date(),
          createdBy: "u2",
          attendees: ["u1", "u2"],
          attendedAt: new Date().setHours(new Date().getHours() + 1),
          lateTime: 456,
        },
      ],
    },
  ];

  const kru = krus.find((kru) => kru.id === props.id);
  return (
    <div className="card kru-details">
      <h3>Kru Details</h3>
      <KruProfile {...kru} />
      <hr></hr>
      <KruAttendanceSummary {...kru}/>
    </div>
  );
};

export default KruDetails;
