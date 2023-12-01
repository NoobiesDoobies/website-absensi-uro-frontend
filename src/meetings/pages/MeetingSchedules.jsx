import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";

import ScheduleCard from "../components/ScheduleCard";
import { AuthContext } from "../../shared/context/AuthContext";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const MeetingSchedules = (props) => {
  const [data, setData] = useState(null);
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMeetingSchedules = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/meetings/schedules`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        setData(response.data.meetings);
        console.log(response.data.meetings);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    if (auth.token) {
      fetchMeetingSchedules();
    }
  }, [auth.token]);

  const onDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/meetings/schedule/${id}`,
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      console.log(response);
      confirmAlert({
        title: "Success",
        message: "Meeting berhasil dihapus",
        buttons: [
          {
            label: "Ok",
          },
        ],
      });
    } catch (err) {
      console.log(err);
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

    setData((prevData) => prevData.filter((data) => data.id !== id));

  };

  return (
    <div className="meeting-schedules">
      {data &&
        data.map((schedule) => {
          return (
            <ScheduleCard key={schedule.id} onDelete={onDelete} {...schedule} />
          );
        })}

      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default MeetingSchedules;
