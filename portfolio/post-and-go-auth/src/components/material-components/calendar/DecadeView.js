import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { TimeContext } from "../../../context";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Grid, Button, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const DecadeView = () => {
  const { date, setDate, check, setCheck, setIsYear, setIsDecade } = useContext(
    TimeContext
  );

  //increase the year of the decade width 10 years
  const increaseYear = () => {
    const tempDate = date;
    tempDate.setFullYear(tempDate.getFullYear() + 10);
    setDate(tempDate);
    setCheck(check + 1);
  };

  //decrese the year of the Date width 10 years
  const decreaseYear = () => {
    const tempDate = date;
    tempDate.setFullYear(tempDate.getFullYear() - 10);
    setDate(tempDate);
    setCheck(check + 1);
  };

  //changes the year of the Date
  const setYear = (year) => {
    const tempDate = date;
    tempDate.setFullYear(year);
    setDate(tempDate);
    setCheck(check + 1);
    setIsDecade(false);
    setIsYear(true);
  };

  //getting the year the decade starts width (ex. 2030, 2040)
  const getDecade = () => {
    const year = date.getFullYear();
    const stringYear = year.toString();
    let decade = stringYear.slice(0, stringYear.length - 1);
    decade += "0";
    decade = parseInt(decade);
    return decade;
  };

  const classes = useStyles();

  const beginDecade = getDecade();

  //here we will store 16 buttons elements
  const yearButtons = [];

  //executes 16 iterations for creating 16 buttons elements
  for (let i = 0; i < 16; i++) {
    let button;
    if (i < 10) {
      button = (
        //represents a button year decade (2020 2021 2022...)
        <Grid
          onClick={() => setYear(i + beginDecade)}
          key={uuidv4()}
          item
          xs={1}
        >
          <Button className={classes.borb} color="default" variant="contained">
            {beginDecade + i}
          </Button>
        </Grid>
      );
    } else {
      button = (
        //represents a button year next decade (2020 2021 2022...)
        <Grid
          onClick={() => setYear(i + beginDecade)}
          key={uuidv4()}
          item
          xs={1}
        >
          <Button className={classes.borg} color="default" variant="contained">
            <span className={classes.clg}>{beginDecade + i}</span>
          </Button>
        </Grid>
      );
    }

    //the ifs below adds 8 columns after each 4 yars
    if (i === 4) {
      yearButtons.push(<Grid key={uuidv4()} item xs={8}></Grid>);
      yearButtons.push(button);
      continue;
    }
    if (i === 8) {
      yearButtons.push(<Grid key={uuidv4()} item xs={8}></Grid>);
      yearButtons.push(button);
      continue;
    }
    if (i === 12) {
      yearButtons.push(<Grid key={uuidv4()} item xs={8}></Grid>);
      yearButtons.push(button);
      continue;
    }

    //adds a button element to the array
    yearButtons.push(button);
  }

  return (
    <>
      {/**the button for decade years */}
      <Grid item xs={2}>
        <Paper>
          <Typography className={classes.ml}>
            {beginDecade}-{beginDecade + 9}
          </Typography>
        </Paper>
      </Grid>
      {/**the left button */}
      <Grid item xs={1}>
        <Paper onClick={decreaseYear}>
          <Typography align="center">
            <FaAngleLeft />
          </Typography>
        </Paper>
      </Grid>
      {/**the right button */}
      <Grid item xs={1}>
        <Paper onClick={increaseYear}>
          <Typography align="center">
            <FaAngleRight />
          </Typography>
        </Paper>
      </Grid>
      {/**adds 8 columns after right arrow (>) */}
      <Grid item xs={8}></Grid>
      {/**16 buttons, from starting decade and 16 years ahead */}
      {yearButtons}
    </>
  );
};

const useStyles = makeStyles({
  ml: {
    marginLeft: "1rem",
    fontWeight: 900,
  },
  clg: {
    color: "grey",
  },
  borg: {
    borderRadius: 10,
  },
  borb: {
    fontWeight: "bold",
    borderRadius: 10,
  },
});
