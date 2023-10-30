import React, { useCallback, useState } from "react";
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

const App = () => {
  console.log("rendering app")
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("653fd2d2f4a60dc6cadbfa17");

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const setAsAdmin = useCallback((role) => {
    if (role === "admin") {
      console.log("Admin");
      setIsAdmin(true);
    } else {
      console.log("Not admin");
    }
    console.log(isAdmin);
  }, []);

  const setId = useCallback((id) => {
    setUserId(id);
  });

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Dashboard/> }/>
        {/* <Route path="/kru" /> */}
        {/* <Route path="/leaderboard" /> */}
        {/* <Route path="/wfh" /> */}
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
    <AuthContext.Provider value={{
      isLoggedIn,
      login,
      logout,
      isAdmin,
      setAsAdmin,
      userId,
      setId,
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
