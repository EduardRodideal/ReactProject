import React from "react";
import { v4 as uuidv4 } from "uuid";
import {FaPlus} from "react-icons/fa";
import { ExpanPanel } from "./ExpanPanel";

//Material-ui stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

export const RowTasks = () => {
  const rows = [];

  for (let i = 6; i < 24; i++) {
    rows.push(
      <Grid key={uuidv4()} className="borderB" item xs={12}>
        <Grid alignItems="center" container>
          <Grid  item xs={1}>
            <Typography align="center"  className="borderR">
              {i} 
            </Typography>
          </Grid>
          <Grid item xs>
            <ExpanPanel />
          </Grid>
          
          
        </Grid>
      </Grid>
    );
  }
  return <Grid container>{rows}</Grid>;
};
