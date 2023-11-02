import React, { useState, useFetch, useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import ProfileDropDown from "./ProfileDropDown";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import { AuthContext } from "../../context/AuthContext";
import "./MainNavigation.css";
import { useEffect } from "react";

const MainNavigation = (props) => {
  const auth = useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const fetchProfileImage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${auth.userId}`
      );
      setProfileImage(response.data.user.image);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, []);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  return (
    <>
      <SideDrawer show={isDrawerOpen}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      {isDrawerOpen && <Backdrop onClick={closeDrawer} />}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <NavLink
            to="/"
            style={({ isActive, isPending }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isPending ? "red" : "black",
              };
            }}
          >
            Absensi
          </NavLink>
        </h1>

        <nav className="main-navigation__drawer-nav-desktop">
          <NavLinks />
        </nav>
        {auth.isLoggedIn && (
          <ProfileDropDown
            imageURL={`http://localhost:5000/${profileImage}`}
            dropDownOptions={[
              {
                to: "/update-profile",
                text: "Update Profile",
              },
              {
                to: "/logout",
                text: "Logout",
              },
            ]}
          />
        )}
      </MainHeader>
    </>
  );
};

export default MainNavigation;
