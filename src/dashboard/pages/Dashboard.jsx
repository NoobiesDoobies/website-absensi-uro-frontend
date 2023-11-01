import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import KruDetails from "../components/KRUDetails";
import AttendanceHistory from "../components/AttendanceHistory";
import { useSearchParams } from "react-router-dom";

const Dashboard = (props) => {
  const [data, setData] = useState(null);
  const {uid} = useParams();
  console.log(uid);


  async function fetchData() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${uid}`
      );
      setData(response.data.user);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>hao</div>
    </>
  );
};

export default Dashboard;
