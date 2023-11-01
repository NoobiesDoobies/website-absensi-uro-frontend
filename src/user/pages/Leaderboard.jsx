import React, { useState, useEffect } from "react";
import axios from "axios";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import LeaderBoardCard from "../components/LeaderboardCard";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [rankList, setRankList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sortUsersAndGenerateIndex = () => {
    const sortedUsers = users.sort((a, b) => {
      return b.meetingsAttended.length - a.meetingsAttended.length;
    });

    const rankList = [1];
    let previousValue = 0;

    let j = 1;
    for (let i = 1; i < sortedUsers.length; i++) {
      if(sortedUsers[i].meetingsAttended.length !== sortedUsers[i-1].meetingsAttended.length){
        j++;
        rankList.push(j)
        continue
      }
      rankList.push(j)
    }
    return { sortedUsers, rankList };
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/api/users`);
        setUsers(response.data.users);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    setSortedUsers(sortUsersAndGenerateIndex().sortedUsers);
    setRankList(sortUsersAndGenerateIndex().rankList);
  }, [users]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <ul className="leaderboard">
        {sortedUsers.map((user, i) => {
          return <LeaderBoardCard key={user.id} rank={rankList[i]} {...user} />;
        })}
      </ul>
    </>
  );
};

export default Leaderboard;
