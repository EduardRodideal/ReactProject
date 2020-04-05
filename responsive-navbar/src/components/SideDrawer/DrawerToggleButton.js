import React from "react";
import "./DrawerToggleButton.css";


export const DrawerToggleButton = ({click}) => (
  <button className="toggle-button" onClick={click}>
    <div className="toggle-button__line" />
    <div className="toggle-button__line" />
    <div className="toggle-button__line" />
  </button>
);
