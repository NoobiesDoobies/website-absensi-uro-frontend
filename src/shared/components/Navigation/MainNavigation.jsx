import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

const MainNavigation = (props) => {
  console.log("main navigation rendered");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

      </MainHeader>
    </>
  );
};

export default MainNavigation;
