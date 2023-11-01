import React, { useState, useEffect } from "react";
import axios from "axios";

import LeaderBoardCard from "../components/LeaderboardCard";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const sortUsersByMeetingsAttended = () => {
    return users.sort((a, b) => {
      return b.meetingsAttended.length - a.meetingsAttended.length;
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users`);
        setUsers(response.data.users);
        console.log(response.data.users);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUsers();
  }, []);

  useEffect(()=>{
    setSortedUsers(sortUsersByMeetingsAttended());
  }, [users])

  return (
    <ul className="leaderboard">
      {sortedUsers.map((user, i ) => {
        return (
          <LeaderBoardCard key={user.id} rank={i+1} {...user} />
        );
      })}
    </ul>
  );
};

export default Leaderboard;
