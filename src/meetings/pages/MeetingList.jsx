import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import MeetingCard from "../components/MeetingCard";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../shared/context/AuthContext";
import "./MeetingList.css";

const MeetingList = () => {
  const auth = useContext(AuthContext);
  const [meetingsData, setMeetingsData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/meetings");
        setMeetingsData(response.data.meetings);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMeetings();
  }, []);

  const onDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/meetings/${id}`,
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

    setMeetingsData((prevData) => prevData.filter((data) => data.id !== id));
  };


  
  const onEdit = async (id) => {
    navigate(`/meetings/edit/${id}`);
  };

  return (
    <div className="meeting-list">
      {meetingsData &&
        meetingsData.map((meeting) => {
          return (
            <MeetingCard
              key={meeting.id}
              {...meeting}
              onDelete={onDelete}
              onEdit={onEdit}
              isDashboard={false}
            />
          );
        })}
    </div>
  );
};

export default MeetingList;
