import React, { useState, useFetch, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FaHome } from "react-icons/fa";

import ProfileDropDown from "./ProfileDropDown";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import { AuthContext } from "../../context/AuthContext";

const MainNavigation = ({ onLogout }) => {
  return (
    <div className="bg-light-blue w-screen px-4">
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
          <button
            onClick={onLogout}
            className="absolute self-end  bg-cream-yellow rounded-full p-2"
          >
            Logout
          </button>
        </h1>
      </MainHeader>
    </div>
  );
};

export default MainNavigation;
