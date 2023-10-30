import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom"; // Remove curly braces
import { CSSTransition } from "react-transition-group"; // Add curly braces

import "./SideDrawer.css";

const SideDrawer = (props) => {
  const nodeRef = useRef();

  const content = (
    <CSSTransition
      in={props.show} // when show is true, the component will be rendered
      timeout={200} // duration of animation in ms
      classNames="slide-in-left" // CSS style of the animation
      mountOnEnter // aside element is mounted when show is true
      unmountOnExit
      nodeRef={nodeRef} // reference to the element that should be animated
    >
      <aside ref={nodeRef} className="side-drawer" onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
