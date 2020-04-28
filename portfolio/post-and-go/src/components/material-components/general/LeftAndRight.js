import React from "react";
import { Grid } from "@material-ui/core";
import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";
import { NavBar } from "./NavBar";

export const LeftAndRight = () => {  
  return (
    //container for the hole aplication
    <>
      <NavBar />
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
    </>
  );
};


