import React, { useState, useEffect } from "react";
import axios from "axios";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import LeaderBoardCard from "../components/LeaderboardCard";
import { useReducer } from "react";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [rankList, setRankList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/api/users`);
        setUsers(response.data.users);
        console.log(users);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const sortUsersAndGenerateIndex = () => {
      const sortedUsers = users.sort((a, b) => {
        return b.points - a.points;
      });

      const rankList = [1];

      let j = 1;
      for (let i = 1; i < sortedUsers.length; i++) {
        if (sortedUsers[i].points !== sortedUsers[i - 1].points) {
          j++;
          rankList.push(j);
          continue;
        }
        rankList.push(j);
      }
      return { sortedUsers, rankList };
    };
    users.map((user) => {
      user.points =
        (user.totalMeetingsAttended - user.totalLateMeetingsAttended) * 100 +
        user.totalLateMeetingsAttended * 50;
    });
    sortUsersAndGenerateIndex();
    setSortedUsers(sortUsersAndGenerateIndex().sortedUsers);
    setRankList(sortUsersAndGenerateIndex().rankList);
  }, [users]);

  return (
    <div className="px-6 ">
      <h1 className="font-bold text-2xl">Leaderboard</h1>
      {isLoading && <LoadingSpinner asOverlay />}
      <ul className="leaderboard">
        {sortedUsers.map((user, i) => {
          return (
            <li key={user.id}>
              <LeaderBoardCard key={user.id} rank={rankList[i]} {...user} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Leaderboard;
