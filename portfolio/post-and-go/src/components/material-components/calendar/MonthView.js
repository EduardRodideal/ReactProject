import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { TimeContext } from "../../../context";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// import styled from "styled-components";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { makeStyles, styled } from "@material-ui/core/styles";

const BtnCurrDateTasks = styled(Button)({
  background: "green",
  fontWeight: "bold",
  borderRadius: 19,
});

const BtnCurrDateNoTasks = styled(Button)({
  background: "green",
  fontWeight: "bold",
  borderRadius: 19,
});

const BtnHaveTasks = styled(Button)({
  background: "white",
  fontWeight: "bold",
  color: "blue",
  borderRadius: 19,
});

const BtnHaveNoTasks = styled(Button)({
  background: "white",
  fontWeight: "bold",
  borderRadius: 19,
});

const BtnNoCurrMonth = styled(Button)({
  background: "white",
  borderRadius: 19,
  color: "grey",
});

export const MonthView = () => {
  const {
    date,
    setDate,
    check,
    setCheck,
    setIsMonth,
    setIsYear,
    dayWidthTask,
    setLoading,
  } = useContext(TimeContext);

  const classes = useStyles();

  const tempDate = date;
  const currentMonth = tempDate.getMonth();
  const firstDayOfMonth = new Date(
    tempDate.getFullYear(),
    tempDate.getMonth(),
    1
  );
  const dayOfWeek = firstDayOfMonth.getDay();
  firstDayOfMonth.setDate(firstDayOfMonth.getDate() - dayOfWeek - 1);

  let column = [];
  let row = [];
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
      let Button = BtnHaveNoTasks;
      //button is current month and have tasks
      if (
        !dayWidthTask.includes(firstDayOfMonth.getDate()) &&
        firstDayOfMonth.getMonth() === date.getMonth() &&
        firstDayOfMonth.getDate() === date.getDate()
      ) {
        Button = BtnCurrDateNoTasks;
      }
      //button is current month and current  date and have tasks
      else if (
        dayWidthTask.includes(firstDayOfMonth.getDate()) &&
        firstDayOfMonth.getMonth() === date.getMonth() &&
        firstDayOfMonth.getDate() === date.getDate()
      ) {
        Button = BtnCurrDateTasks;
      }
      //button is not current month
      else if (firstDayOfMonth.getMonth() !== currentMonth) {
        Button = BtnNoCurrMonth;
      }
      //button is current month and have tasks
      else if (
        dayWidthTask.includes(firstDayOfMonth.getDate()) &&
        firstDayOfMonth.getMonth() === date.getMonth()
      ) {
        Button = BtnHaveTasks;
      }
      const year = firstDayOfMonth.getFullYear();
      const month = firstDayOfMonth.getMonth();
      const day = firstDayOfMonth.getDate();
      let columnFor = (
        //shows one date of the month in the calendar
        <Button
          size="medium"
          key={uuidv4()}
          onClick={() => {
            setDate(new Date(year, month, day));
            setCheck(check + 1);
            setLoading(true);
          }}
        >
          {firstDayOfMonth.getDate()}
        </Button>
      );
      //represents a row and in each column a button
      column.push(columnFor);
    }
    //on each index a row with buttons
    row.push(
      <Grid item xs={12}>
        <span className={classes.mar}></span>
        {column}
      </Grid>
    );
    column = [];
  }

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

  const increaseMonth = () => {
    const tempDate = date;
    tempDate.setMonth(tempDate.getMonth() + 1);
    setDate(tempDate);
    setCheck(check + 1);
  };
  const decreaseMonth = () => {
    const tempDate = date;
    tempDate.setMonth(tempDate.getMonth() - 1);
    setDate(tempDate);
    setCheck(check - 1);
  };

  return (
    <>
      {/** month and year (April 2020) */}
      <Grid item xs={3}>
        <Paper
          onClick={() => {
            setIsMonth(false);
            setIsYear(true);
          }}
        >
          <Typography className={classes.mar}>
            {getMonth()} {date.getFullYear()}
          </Typography>
        </Paper>
      </Grid>
      {/**left arrow < */}
      <Grid item xs={1}>
        <Paper
          onClick={() => {
            decreaseMonth();
            setCheck(check + 1);
            setLoading(true);
          }}
        >
          <Typography align="center">
            <FaAngleLeft />
          </Typography>
        </Paper>
      </Grid>
      {/**right arrow  >*/}
      <Grid item xs={1}>
        <Paper
          onClick={() => {
            increaseMonth();
            setCheck(check + 1);
            setLoading(true);
          }}
        >
          <Typography align="center">
            <FaAngleRight />
          </Typography>
        </Paper>
      </Grid>
      {/**the rest of the row */}
      <Grid item xs={7}>
        <Paper></Paper>
      </Grid>
      {/**days of the week (Su Mo Tu ...) */}
      <Grid item xs={12}>
        <Paper className={classes.mr2}>
          <Typography>
            <span className={classes.ml2}>Su</span>
            <span className={classes.ml3}>Mo</span>
            <span className={classes.mltu}>Tu</span>
            <span className={classes.ml3}>We</span>
            <span className={classes.mlth}>Th</span>
            <span className={classes.ml3}>Fr</span>
            <span className={classes.ml3}>Sa</span>
          </Typography>
        </Paper>
      </Grid>

      {/** all the dates of month */}
      {row.map((item) => (
        <div key={uuidv4()}>{item}</div>
      ))}
    </>
  );
};
//the custom css
const useStyles = makeStyles({
  mar: {
    marginLeft: "1rem",
  },
  ml2: {
    marginLeft: "2rem",
  },
  ml3: {
    marginLeft: "3rem",
  },
  mltu: {
    marginLeft: "37px",
  },
  mlth: {
    marginLeft: "40px",
  },
  mr2: {
    marginRight: "2rem",
  },
});
