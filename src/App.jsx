import React, { useCallback, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./dashboard/pages/Dashboard";
import { AuthContext } from "./shared/context/AuthContext";
import Auth from "./user/pages/Auth";
import ScheduleForm from "./meetings/pages/ScheduleForm";
import Attend from "./user/pages/Attend";
import UpdateProfile from "./user/pages/UpdateProfile";
import UpdatePassword from "./user/pages/UpdatePassword"
import Leaderboard from "./user/pages/Leaderboard";
import MeetingSchedules from "./meetings/pages/MeetingSchedules";
import WFH from "./user/pages/WFH";
import MeetingList from "./meetings/pages/MeetingList";
import EditMeetingForm from "./meetings/pages/EditMeetingForm";
import Home from "./user/pages/Home";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null); 
  const [token, setToken] = useState(null);
  const login = useCallback((userId, email, isAdmin, token, name) => {
    setIsLoggedIn(true);
    setIsAdmin(isAdmin);
    setUserId(userId);
    setToken(token);
    setName(name)

    localStorage.setItem(
      "userData",
      JSON.stringify({ userId, email, isAdmin, token, name })
    );
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(
        storedData.userId,
        storedData.email,
        storedData.isAdmin,
        storedData.token,
        storedData.name
      );
    }
  }, [login]);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserId(null);
    setToken(null);
    localStorage.removeItem("userData");
  }, []);

  // const LogoutWrapper = () => {
  //   useEffect(() => {
  //     logout();
  //   }, []);
  //   return null;
  // }

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/home/:uid" element={<Home logout={logout}/>} />
        {/* <Route path="/dashboard/:uid" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/wfh" element={<WFH />} />
        <Route path="/attend" element={<Attend />} />
        <Route path="/create-meeting" element={<ScheduleForm />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/update-password" element={<UpdatePassword/>}/>
        <Route path="/meeting-schedules" element={<MeetingSchedules/>}/>
        <Route path="/meetings/edit/:mid" element={<EditMeetingForm/>}/>
        <Route path="/meetings" element={<MeetingList/>}/>
        <Route path="/logout" element={<LogoutWrapper/>} /> */}
        <Route
          path="*"
          element={<Navigate to={`/home/${userId}`} replace />}
        />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" replace />}></Route>
      </Routes>
    );
  }
  return (
    // Auth context makes all children element can access this context
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        isAdmin,
        userId,
        token,
      }}
    >
      <Router>
        {/* MainNavigation will be rendered only if authContext is set*/}
        {/* <MainNavigation/> */}
        <div id="app-body">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
