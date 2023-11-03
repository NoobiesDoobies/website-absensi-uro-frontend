import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import ScheduleCard from "../components/ScheduleCard";
import { AuthContext } from "../../shared/context/AuthContext";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "./MeetingSchedules.css"

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
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchMeetingSchedules();
  }, [auth.token]);

  return (
    <>
      <div className="meeting-schedules">
      {
        data && data.map((schedule)=>{
            return (
                <ScheduleCard key={schedule.id} {...schedule}/>
            )
        })
            
        
      }

        {isLoading && <LoadingSpinner />}
      </div>
    </>
  );
};

export default MeetingSchedules;
