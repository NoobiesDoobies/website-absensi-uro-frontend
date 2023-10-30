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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <>
        <Route path="/" />
        <Route path="/kru" element={<Dashboard />} />
        <Route path="/leaderboard" />
        <Route path="/wfh" />
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/leaderboard" />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" replace />}></Route>
      </>
    );
  }
  return (
    // Auth context makes all children element can access this context
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <Router>
        <MainNavigation />
        <Routes>{routes}</Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
