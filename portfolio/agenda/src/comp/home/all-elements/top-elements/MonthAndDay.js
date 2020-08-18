import React from "react";
import { myCss } from "../../../../myCss";

//Material-ui stuff
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = myCss;

const MonthAndDay = (props) => {
  const { classes } = props;
  return (
    <>
      <Typography className={classes.typoMonth} >
        May
      </Typography>
      <Typography>2020</Typography>
      <Typography className={classes.typoDay}>Friday</Typography>
    </>
  );
};

export default withStyles(styles)(MonthAndDay);
