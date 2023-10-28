import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './dashboard/pages/Dashboard'

const App = () => {
  // let query = useQuery();
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/kru" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
