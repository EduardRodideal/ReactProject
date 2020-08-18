import React from "react";
import { myCss } from "../../../../myCss";

//Material-ui stuff
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = myCss;

const Week = (props) => {
  const { classes } = props;
  return (
    <>
      <Typography className={classes.typoWeek} >
        Week
      </Typography>
      <Typography className={classes.typoWeekNr}>18</Typography>
    </>
  );
};

export default withStyles(styles)(Week);