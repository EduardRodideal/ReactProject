import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
// import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
export const CircularInterminate = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <CircularProgress className="circular" /> */}
      <Typography variant="h6" align="center">Loading...</Typography>
      {/* <LinearProgress /> */}
    </div>
  );
};
