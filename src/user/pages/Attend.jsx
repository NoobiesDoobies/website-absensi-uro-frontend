import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { AuthContext } from "../../shared/context/AuthContext";
import { set } from "react-hook-form";

const Attend = () => {
  const auth = useContext(AuthContext);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function attend() {
      const data = {
        attendedAt: new Date(),
      };
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
        confirmAlert({
          title: "Success",
          message: "Absen berhasil",
          buttons: [
            {
              label: "Ok",
            },
          ],
        });
      } catch (err) {
        if (err.response) {
          confirmAlert({
            title: "Error",
            message: err.response.data.message,
            buttons: [
              {
                label: "Ok",
              },
            ],
          });
        }
        console.log(err.message);
      }
    }

    if (auth.token) {
      attend();
    }
  }, [auth.token]);

  return <div>{response && <Navigate to="/dashboard" replace={true} />}</div>;
};

export default Attend;
