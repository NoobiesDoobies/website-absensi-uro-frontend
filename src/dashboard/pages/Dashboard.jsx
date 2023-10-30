import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import KruDetails from "../components/KRUDetails";
import AttendanceHistory from "../components/AttendanceHistory";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/AuthContext";

const Dashboard = (props) => {
  // const uid = searchParams.get('uid');
  console.log("rendering");
  const auth = useContext(AuthContext);
  const [data, setData] = useState(null);

  async function fetchData() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${auth.userId}`
      );
      setData(response.data.user);
      console.log(data)
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>halo</div>
    </>
  );
};

export default Dashboard;
