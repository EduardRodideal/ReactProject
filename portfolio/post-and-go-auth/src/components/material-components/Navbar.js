import React from "react";
import HomeBtn from "./navbarButtons/HomeBtn";
import LoginBtn from "./navbarButtons/LoginBtn";
import LogoutBtn from "./navbarButtons/LogoutBtn";
import SignupBtn from "./navbarButtons/SignupBtn";

//Material-ui stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

export const Navbar = () => {
  return (
    <AppBar>
      <Toolbar className="nav-container">
        <LoginBtn />
        <HomeBtn />
        <SignupBtn />
        <LogoutBtn />
      </Toolbar>
    </AppBar>
  );
};
