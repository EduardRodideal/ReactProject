import React, { useEffect, useState, useContext } from "react";
import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";
import { SessionContext } from "../../../context2";
import SessionExpired from "../pages/SessionExpired";

import jwtDecode from "jwt-decode";

//Material-ui
import { Grid } from "@material-ui/core";

export const LeftAndRight = () => {
  const { setAlert, alert } = useContext(SessionContext);

  //when session expires it redirects to login page
  useEffect(() => {
    const token = localStorage.FBIdToken;
    const decodedToken = jwtDecode(token);
    const time = decodedToken.exp * 1000 - Date.now() - 359 * 1000;
    console.log(time / 1000, "the time");

    setTimeout(() => {
      setAlert((prev) => !prev);
    }, time);
    return () => clearTimeout();
  }, []);

  return (
    //container for the hole aplication
    <>
      {alert && <SessionExpired />}
      {!alert && (
        <Grid container>
          {/**first row left side */}
          <Grid item xs={8}>
            <LeftSide />
          </Grid>
          {/**first row (right side) */}
          <Grid item xs={4}>
            <RightSide />
          </Grid>
        </Grid>
      )}
    </>
  );
};
