import React from "react";
import { FaPlus } from "react-icons/fa";
import { myCss } from "../../myCss";
import Date from "./all-elements/top-elements/Date";
import MonthAndDay from "./all-elements/top-elements/MonthAndDay";
import Week from "./all-elements/top-elements/Week";
import TopMiniCalendarL from "./all-elements/top-elements/TopMiniCalendarL";
import TopMiniCalendarR from "./all-elements/top-elements/TopMiniCalendarR";
import {ModalPlus} from "./all-elements/top-elements/ModaPlus"

//Material-ui stuff
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = myCss;

const TopOfPage = (props) => {
  const { classes } = props;
  return (
    <Grid direction="row" justify="center" container spacing={0}>
      {/**lef date month week */}
      <Grid className={classes.gridItem} item xs={4}>
        <Grid alignItems="center" container>
          <Grid item xs={3}>
            <Date />
          </Grid>
          <Grid item xs={3}>
          <ModalPlus/>
          </Grid>
          <Grid item xs={3}>
            <MonthAndDay />
          </Grid>
          <Grid item xs={3}>
            <Week />
          </Grid>
        </Grid>
      </Grid>
      {/**calendar left */}
      <Grid item xs={2}>
        <Grid container justify="flex-end" >
          <Grid item xs={9}>
            <TopMiniCalendarL />
          </Grid>
        </Grid>
      </Grid>
      {/**calendar right */}
      <Grid item xs={2}>
        <Grid container>
          <Grid item xs={3}>
            <TopMiniCalendarR />
          </Grid>
        </Grid>
      </Grid>
      {/**right month day week */}
      <Grid className={classes.gridItem} item xs={4}>
        <Grid direction="row-reverse" alignItems="center" container>
          <Grid item xs={3}>
            <Date />
          </Grid>
          <Grid item xs={3}>
            <ModalPlus/>
          </Grid>
          <Grid item xs={3}>
            <MonthAndDay />
          </Grid>
          <Grid item xs={3}>
            <Week />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(TopOfPage);
