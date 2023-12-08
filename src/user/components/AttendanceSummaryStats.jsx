import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import tailwindConfig from "../../../tailwind.config.js";

import DonutChartWithText from "../../shared/charts/DonutChartWithText.jsx";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/AuthContext.jsx";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceSummaryStats = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const uid = auth.userId;
  const [userData, setUserData] = useState(null);
  const [userMeetingsData, setUserMeetingsData] = useState(null);
  const [meetingsAttendedData, setMeetingsAttendedData] = useState(null);
  const [allMeetingsData, setAllMeetingsData] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [lateData, setLateData] = useState(null);
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

    fetchData();
    fetchAllMeetings();
  }, [uid]);

  useEffect(() => {
    if (meetingsAttendedData && allMeetingsData) {
      setAttendanceData({
        labels: ["Hadir", "Absen"],
        datasets: [
          {
            data: [meetingsAttendedData.length, allMeetingsData.length],
            backgroundColor: ["#eed988", "#878a84"],
            hoverBackgroundColor: ["#fad456", "#748c9c"],
          },
        ],
      });
      setLateData({
        labels: ["On Time", "Telat"],
        datasets: [
          {
            data: [
              meetingsAttendedData.length,
              meetingsAttendedData.filter((meeting) => {
                meeting.late > 0;
              }).length,
            ],
            backgroundColor: ["#eed988", "#878a84"],
            hoverBackgroundColor: ["#fad456", "#748c9c"],
          },
        ],
      });
    }
  }, [meetingsAttendedData, allMeetingsData]);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      center: {
        text: "test",
      },
    },
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, chartArea, data } = chart;
      ctx.save();
      ctx.font = "16px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;
      const percentage = Math.round(
        (data.datasets[0].data[0] /
          (data.datasets[0].data[0] + data.datasets[0].data[1])) *
          100,
        1
      );
      ctx.fillText(`${percentage}%`, centerX, centerY);
    },
  };

  return (
    <>
      {attendanceData && lateData && (
        <div className="font-normal border border-slate-300 py-2 px-3 rounded-xl text-lg grid grid-cols-2 gap-2">
          <div className="flex flex-col justify-between items-center">
            <p>Kehadiran</p>
            <Doughnut
              data={attendanceData}
              options={options}
              plugins={[textCenter]}
            />
          </div>
          <div className="flex flex-col justify-between items-center">
            <p>On Time</p>
            <Doughnut
              data={lateData}
              options={options}
              plugins={[textCenter]}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AttendanceSummaryStats;
