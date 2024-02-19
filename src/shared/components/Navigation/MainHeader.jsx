import React from "react";

const MainHeader = (props) => {
  return <header className="main-header flex w-screen">{props.children}</header>;
};

export default MainHeader;
