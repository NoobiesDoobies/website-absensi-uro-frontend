import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";

import { AuthContext } from "../../shared/context/AuthContext";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ProfileSummary from "../components/ProfileSummary";
import AttendanceHistory from "../components/AttendanceHistory";

const Dashboard = (props) => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userMeetingsData, setUserMeetingsData] = useState(null);
  const [meetingsAttendedData, setMeetingsAttendedData] = useState(null);
  const [allMeetingsData, setAllMeetingsData] = useState(null);
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
          let meeting = userMeeting.meeting;
          meeting.lateTime = userMeeting.lateTime;
          meeting.attendedAt = userMeeting.attendedAt;
          return meeting;
        });

        setMeetingsAttendedData(meetings);

        setIsLoading(false);
      } catch (err) {
        if (err.response) {
          confirmAlert({
            title: "Error",
            message: err.response.data.message,
            buttons: [
              {
                label: "Ok",
              },
            ],
          });
        }
        setIsLoading(false);
        console.log(err.message);
      }
    }
    fetchData();
  }, [uid]);

  useEffect(() => {
    async function fetchAllMeetings() {
      try {
        const response = await axios.get(`http://localhost:5000/api/meetings`);
        setAllMeetingsData(response.data.meetings.reverse());
      } catch (err) {
        if (err.response) {
          confirmAlert({
            title: "Error",
            message: err.response.data.message,
            buttons: [
              {
                label: "Ok",
              },
            ],
          });
        }
        console.log(err.message);
      }
    }
    fetchAllMeetings();
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {userData && meetingsAttendedData && allMeetingsData &&(
        <div className="dashboard">
          <ProfileSummary
            name={userData.name}
            dateOfBirth={userData.dateOfBirth}
            position={userData.position}
            email={userData.email}
            totalAttendance={userData.totalMeetingsAttended}
            meetings={userMeetingsData}
            imageURL={`http://localhost:5000/${userData.image}`}
          />
          <AttendanceHistory
            meetingsAttendedData={meetingsAttendedData}
            allMeetingsData={allMeetingsData}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
