import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../../shared/context/AuthContext";
import { set } from "react-hook-form";

const Attend = () => {
  const auth = useContext(AuthContext);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function attend() {
      const data = {
        attendedAt: new Date(),
      }
      try {
        const response = await axios.post(
          `http://localhost:5000/api/users/attend`,
          data,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        setResponse(response.data);
        console.log(response.data);
      } catch (err) {
        if (err.response) {
          alert(err.response.data.message);
        }
        console.log(err.message);
      }
    }

    if (auth.token) {
      attend();
    }
  }, [auth.token]);

  return (
    <div>{response && <Navigate to="/dashboard" replace={true} />}</div>
  );
};

export default Attend;
