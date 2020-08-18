import React from "react";
import { myCss } from "../../../../myCss";

//Material-ui stuff
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = myCss;

const Date = (props) => {
  const { classes } = props;
  return (
    <Typography  className={classes.typoDate}>
      1
    </Typography>
  );
};

export default withStyles(styles)(Date);
