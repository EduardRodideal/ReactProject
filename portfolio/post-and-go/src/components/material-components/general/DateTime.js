import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const DateTime = () => {
  const [date, setDate] = useState(new Date());

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let meridian = hours < 12 ? "AM" : "PM";

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setDate(new Date(), 1000);
  //   });
  //   return () => clearInterval(interval);
  // }, []);

  const getDay = () => {
    const day = date.getDay();
    const week = [
      "Sanday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return week[day];
  };

  const getMonth = () => {
    const month = date.getMonth();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month];
  };

  const classes = useStyles();

  return (
    <>
      {/**hours minutes seconds */}
      <Grid item xs={3}>
        <Paper>
          <Typography align="center" variant="h6">
            {hours} : {minutes < 10 ? `0${minutes}` : minutes} :
            {seconds < 10 ? `0${seconds}` : seconds}
          </Typography>
        </Paper>
      </Grid>
      {/**the meridian (AM/PM) */}
      <Grid item xs={9}>
        <Paper className={classes.mr2}>
          <Typography variant="h6">{meridian}</Typography>
        </Paper>
      </Grid>
      {/**Monday, May 12 2020 */}
      <Grid item xs={12}>
        <Paper className={classes.mr2}>
          <Typography className={classes.pad} variant="h6">
            {getDay()}, {getMonth()} {date.getDate()}, {date.getFullYear()}
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

const useStyles = makeStyles({
  pad: {
    marginLeft: "1rem",
  },
  mr2: {
    marginRight: "2rem;",
  },
});
