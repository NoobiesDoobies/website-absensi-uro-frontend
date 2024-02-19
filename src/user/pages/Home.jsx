import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Profile from "../components/Profile";

import { AuthContext } from "../../shared/context/AuthContext";
import { NavLink } from "react-bootstrap";
import NavLinks from "../../shared/components/Navigation/NavLinks";

const Home = () => {
  // query params uid
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

  async function attend() {
    const data = {
      attendedAt: new Date(),
    };
    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/attend`,
        data,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      confirmAlert({
        title: "Success",
        message: "Absen berhasil",
        buttons: [
          {
            label: "Ok",
          },
        ],
      });
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
  return (
    <div className="flex flex-col items-center justify-center">
      {isLoading && <LoadingSpinner asOverlay />}
      {userData && (
        <>
          <div className="flex-1 flex-col items-center justify-center px-6">
            <div className="flex flex-row items-center justify-between">
              <Profile {...userData} />
              <button
                className="mx-2 bg-light-blue p-3 rounded-full text-white"
                onClick={attend}
              >
                Attend
              </button>
            </div>
            <div className="my-3">
              <h1 className="text-5xl font-bold">
                Hi, {userData.name.split(" ")[0]}
              </h1>
              <p className="font-bold text-2xl text-dark-blue">
                Selamat ngoprek :D
              </p>
            </div>
            <NavLinks />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
