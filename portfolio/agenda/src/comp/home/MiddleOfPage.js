import React from "react";
import {RowTasks} from "./all-elements/middle-elements/RowTasks";

//Material-ui stuff
import Grid from "@material-ui/core/Grid";

export const MiddleOfPage = () => {
  return (
    <Grid spacing={2} container>
      <Grid className="border" item xs={6}>
        <RowTasks />
      </Grid>
      <Grid className="border" item xs={6}>
        <RowTasks />
      </Grid>
    </Grid>
  );
};
