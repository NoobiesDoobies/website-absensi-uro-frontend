import React, { useState, useFetch, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import ProfileDropDown from "./ProfileDropDown";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import { AuthContext } from "../../context/AuthContext";

const MainNavigation = (props, { onLogout }) => {
  const auth = useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [logo, setLogo] = useState(null);

  useEffect(() => {
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

    if (auth.userId) {
      fetchProfileImage();
    }
  }, [auth.userId]);

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
              };
            }}
          >
            <img 
              src="http://localhost:5000/public/logo/logo_garudago.png"
            />
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
                to: "/update-password",
                text: "Update Password",
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
