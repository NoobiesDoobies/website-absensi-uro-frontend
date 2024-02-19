import React, { useState, useFetch, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

import MainHeader from "./MainHeader";
import { AuthContext } from "../../context/AuthContext";
import ProfileDropDown from "../UIElements/ProfileDropDown";

const MainNavigation = ({ onLogout }) => {
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${auth.userId}`
        );
        setUserData(response.data.user);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, [auth.userId]);

  return (
    <div className="bg-light-blue w-screen mb-5">
      <MainHeader>
        <h1 className="flex-1 flex items-center justify-between mx-8 py-2" >
          <div className="flex items-center justify-center">
            <NavLink to="/" className="flex justify-center items-center">
              <img
                src="http://localhost:5000/public/logo/logo_garudago-cropped.png"
                className="h-16"
              />
              <h1 className="pl-2 font-sans text-lg">KRAI ITB</h1>
            </NavLink>
          </div>
        <ProfileDropDown {...userData} onLogout={onLogout}/>
        </h1>
      </MainHeader>
    </div>
  );
};

export default MainNavigation;
