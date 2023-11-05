import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ProfileSummary from "../components/ProfileSummary";
import AttendanceHistory from "../components/AttendanceHistory";
import "./Dashboard.css";

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userMeetingsData, setUserMeetingsData] = useState(null);
  const [meetingsData, setMeetingsData] = useState(null);
  const { uid } = useParams();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/meetings/${uid}`
        );
        setUserData(response.data.user);
        setUserMeetingsData(response.data.userMeetings);
        const meetings = response.data.userMeetings.map((userMeeting) => {
          return userMeeting.meeting;
        });
        setMeetingsData(meetings);

        setIsLoading(false);
      } catch (err) {
        if (err.response) {
          alert(err.response.data.message);
        }
        setIsLoading(false);
        console.log(err.message);
      }
    }
    fetchData();
  }, [uid]);


  return (
    <>
      {isLoading && <LoadingSpinner />}
      {userData && meetingsData && (
        <div className="dashboard">
          <ProfileSummary
            name={userData.name}
            position={userData.position}
            email={userData.email}
            totalAttendance={userData.totalMeetingsAttended}
            meetings={userMeetingsData}
            imageURL={`http://localhost:5000/${userData.image}`}
          />
          <AttendanceHistory />
        </div>
      )}
    </>
  );
};

export default Dashboard;
