import React, { useCallback, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./dashboard/pages/Dashboard";
import AuthContext from "./shared/context/AuthContext";
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

  return (
    // Auth context makes all children element can access this context
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <Router>
        <MainNavigation />

        <Routes>
          <Route path="/"/>
          <Route path="/kru" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
