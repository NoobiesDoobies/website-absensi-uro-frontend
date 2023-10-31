import React, { useCallback, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./dashboard/pages/Dashboard";
import { AuthContext } from "./shared/context/AuthContext";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./user/pages/Auth";
import MeetingForm from "./meetings/pages/MeetingForm";

const App = () => {
  console.log("rendering app");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const login = useCallback((userId, email, isAdmin, token) => {
    setIsLoggedIn(true);
    setIsAdmin(isAdmin);
    setUserId(userId);
    setToken(token);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId, email, isAdmin, token })
    );
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(
        storedData.userId,
        storedData.email,
        storedData.isAdmin,
        storedData.token
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

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/kru" /> */}
        {/* <Route path="/leaderboard" /> */}
        {/* <Route path="/wfh" /> */}
        <Route path="/create-meeting" element={<MeetingForm />} />
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        {/* <Route path="/leaderboard" /> */}
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
        <MainNavigation />
        {routes}
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
