import React, { useState, useEffect } from "react";
import axios from "axios";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import LeaderBoardCard from "../components/LeaderboardCard";
import "../components/LeaderboardCard.css";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [rankList, setRankList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sortUsersAndGenerateIndex = () => {
    const sortedUsers = users.sort((a, b) => {
      return b.totalMeetingsAttended - a.totalMeetingsAttended;
    });

    const rankList = [1];

    let j = 1;
    for (let i = 1; i < sortedUsers.length; i++) {
      if (
        sortedUsers[i].totalMeetingsAttended !==
        sortedUsers[i - 1].totalMeetingsAttended
      ) {
        j++;
        rankList.push(j);
        continue;
      }
      rankList.push(j);
    }
    return { sortedUsers, rankList };
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/api/users`);
        setUsers(response.data.users);
        if (response.data.totalMeetingsAttended === 0) {
          setUsers((prevUsers) => {
            prevUsers.map((user) => {
              user.totalMeetingsAttended = 0;
              user.totalLateMeetingsAttended = 0;
              return user;
            });
            return prevUsers;
          });
        }
        else{
          setUsers((prevUsers) => {
            prevUsers.map((user, i) => {
              user.totalMeetingsAttended = [response.data.totalMeetingsAttended[i]]
              user.totalLateMeetingsAttended = [response.data.totalLateMeetingsAttended[i]]
              return user;
            });
            return prevUsers;
          })
        }
        setIsLoading(false);
        console.log(users);
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
        <li className="leaderboard-card-header card">
          <div className="leaderboard-card-body card-body">
            <div className="leader-board-rank">Rank</div>
            <div>Name</div>
            <div className="meeting-attended-wrapper">
              <div>Late</div>
              <div>Total</div>
            </div>
          </div>
        </li>
        {sortedUsers.map((user, i) => {
          return <LeaderBoardCard key={user.id} rank={rankList[i]} {...user} />;
        })}
      </ul>
    </>
  );
};

export default Leaderboard;
