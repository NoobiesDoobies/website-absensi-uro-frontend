import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../../shared/context/AuthContext";

const Attend = () => {
  const [isRequested, setIsRequested] = useState(false);
  const auth = useContext(AuthContext);
  async function attend() {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/attend`,
        { userId: auth.userId },
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          }
        }
      );
      setIsRequested(true);
      console.log(response.data);
    } catch (err) {
        if(err.response){
            alert(err.response.data.message);
        }
        setIsRequested(false);
      console.log(err.message);
    }
  }
  
  useEffect(() => {
    attend();
  }, []);


  return (
    <div>
        {isRequested && <Navigate to="/dashboard"  replace={true} />}
    </div>
  );
};

export default Attend;
