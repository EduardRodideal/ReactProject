import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { TimeContext } from "../../../context";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Grid, Button, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const YearView = () => {
  const {
    date,
    setDate,
    check,
    setCheck,
    setIsMonth,
    setIsYear,
    setIsDecade,
    setLoading,
  } = useContext(TimeContext);

  const classes = useStyles();

  const increaseYear = () => {
    const tempDate = date;
    tempDate.setFullYear(tempDate.getFullYear() + 1);
    setDate(tempDate);
    setCheck(check + 1);
  };

  const decreaseYear = () => {
    const tempDate = date;
    tempDate.setFullYear(tempDate.getFullYear() - 1);
    setDate(tempDate);
    setCheck(check + 1);
  };

  const setMonth = (month) => {
    const tempDate = date;
    tempDate.setMonth(month);
    setDate(tempDate);
    setCheck(check + 1);
    setIsYear(false);
    setIsMonth(true);
  };

  const SetMonthAndYear = (month) => {
    const tempDate = date;
    tempDate.setMonth(month);
    tempDate.setFullYear(tempDate.getFullYear() + 1);
    setDate(tempDate);
    setCheck(check + 1);
    setIsYear(false);
    setIsMonth(true);
  };

  const monthsArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
  ];

  const monthButtons = [];

  for (let i = 0; i < monthsArray.length; i++) {
    let button;
    if (i < 12) {
      if (i === date.getMonth()) {
        button = (
          //represents the button of current month
          <Grid key={uuidv4()} item xs={1}>
            <Button
              color="primary"
              variant="contained"
              className={classes.borgreen}
              onClick={() => {
                setMonth(i);
                setCheck(check + 1);
                setLoading(true);
              }}
            >
              {monthsArray[i]}
            </Button>
          </Grid>
        );
      } else {
        button = (
          //represents a button, current year (Ian Feb Mar...)
          <Grid key={uuidv4()} item xs={1}>
            <Button
              color="default"
              variant="contained"
              className={classes.bor}
              onClick={() => {
                setMonth(i);
                setCheck(check + 1);
                setLoading(true);
              }}
            >
              {monthsArray[i]}
            </Button>
          </Grid>
        );
      }
    } else {
      button = (
        //represents a button, next year (Ian Feb Mar)
        <Grid key={uuidv4()} item xs={1}>
          <Button
            color="default"
            variant="contained"
            className={classes.borcol}           
            onClick={() => {
              SetMonthAndYear(i - 12);
              setCheck(check + 1);
              setLoading(true);
            }}
          >
            {monthsArray[i]}
          </Button>
        </Grid>
      );
    }
    //the ifs below adds 8 columns after each 4 months
    if (i === 4) {
      monthButtons.push(<Grid key={uuidv4()} item xs={8}></Grid>);
      monthButtons.push(button);
      continue;
    }
    if (i === 8) {
      monthButtons.push(<Grid key={uuidv4()} item xs={8}></Grid>);
      monthButtons.push(button);
      continue;
    }
    if (i === 12) {
      monthButtons.push(<Grid key={uuidv4()} item xs={8}></Grid>);
      monthButtons.push(button);
      continue;
    }

    monthButtons.push(button);
  }

  return (
    <>
      {/**the year (2020) */}
      <Grid
        onClick={() => {
          setIsDecade(true);
          setIsYear(false);
        }}
        item
        xs={2}
      >
        <Paper>
          <Typography className={classes.ml}>{date.getFullYear()}</Typography>
        </Paper>
      </Grid>
      {/**left arrow (<) */}
      <Grid onClick={decreaseYear} item xs={1}>
        <Paper>
          <Typography align="center">
            <FaAngleLeft />
          </Typography>
        </Paper>
      </Grid>
      {/**right arrow (>) */}
      <Grid onClick={increaseYear} item xs={1}>
        <Paper>
          <Typography align="center">
            <FaAngleRight />
          </Typography>
        </Paper>
      </Grid>
      {/**fills the space after right arrow (>) */}
      <Grid item xs={8}></Grid>
      {/**the months (Ian Feb Mar Apr) */}
      {monthButtons}
    </>
  );
};

const useStyles = makeStyles({
  bor: {
    borderRadius: 19,
    fontWeight: "bold",
  },
  borcol: {
    borderRadius: 19,
    color: "grey",
  },
  borgreen: {
    borderRadius: 19,
    background: "green",
  },
  ml: {
    marginLeft: "1rem",
    fontWeight:900
  },
});
