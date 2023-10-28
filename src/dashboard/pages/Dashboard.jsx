import React from "react";
import KruDetails from "../components/KRUDetails";
import AttendanceHistory from "../components/AttendanceHistory";
import { useSearchParams } from 'react-router-dom'

const Dashboard = (props) => {
  const [searchParams] = useSearchParams();
  // const uid = searchParams.get('uid');
  const uid = 'u2'
  return (
    <>
      <KruDetails id={uid} />
      <AttendanceHistory id={uid}/>
    </>
  );
};

export default Dashboard;