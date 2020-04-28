import React from "react";
import { Grid } from "@material-ui/core";
import { DateTime } from "./DateTime";
import { Calendar } from "../calendar/Calendar";

export const RightSide = () => {
  return (
    <Grid container spacing={1}>
      <DateTime />
      <Calendar />
    </Grid>
  );
};
