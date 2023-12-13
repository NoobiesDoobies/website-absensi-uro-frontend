import React, { useState, useFetch, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

import MainHeader from "./MainHeader";
import { AuthContext } from "../../context/AuthContext";

const MainNavigation = ({ onLogout }) => {
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
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
    <div className="bg-light-blue w-screen px-4 mb-5">
      <MainHeader>
        <h1 className="flex flex-col justify-center items-center">
          <NavLink to="/" className="absolute self-start">
            <FaHome className="text-4xl text-dark-blue" />
          </NavLink>
          <NavLink to="/" className="flex flex-col justify-center items-center">
            <img
              src="http://localhost:5000/public/logo/logo_garudago.png"
              className="w-6/12"
            />
          </NavLink>

          <div className="absolute self-end">
            {!isDropDownOpen ? (
              <div className="  bg-cream-yellow rounded-lg flex flex-col">
                <button
                  onClick={toggleDropDown}
                  type="button"
                  className="flex-initial grow-0 p-2 flex flex-row items-center"
                >
                  <img
                    src={`http://localhost:5000/${userData && userData.image}`}
                    className=" w-10 h-10 rounded-full object-cover mr-2"
                  />
                  <FaArrowDown className="text-dark-blue" />
                </button>
              </div>
            ) : (
              <div className=" bg-cream-yellow rounded-full flex flex-col">
                <button
                  onClick={toggleDropDown}
                  type="button"
                  className=" p-2 flex flex-row items-center"
                >
                  <img
                    src={`http://localhost:5000/${userData && userData.image}`}
                    className="flex-1 w-10 h-10 rounded-full object-cover mr-2"
                  />
                  {isDropDownOpen ? (
                    <FaArrowUp className="text-dark-blue" />
                  ) : (
                    <FaArrowDown className="text-dark-blue" />
                  )}
                </button>
                <div className="flex flex-col flex-1 right-0 top-0 bg-cream-yellowshadow-lg">
                  <NavLink
                    to={`/users/${auth.userId}`}
                    className="block px-4 py-2 text-sm text-dark-blue hover:bg-light-blue hover:text-white"
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={onLogout}
                    className="block px-4 py-2 text-sm text-dark-blue hover:bg-light-blue hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </h1>
      </MainHeader>
    </div>
  );
};

export default MainNavigation;
