import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { TimeContext } from "../../../context";
import { FaTrash } from "react-icons/fa";
import { Grid, Paper, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//renders all tasks for the chosen date
export const TasksForDay = () => {
  const { useItems, loading, toggleExecution, deleteTask, date } = useContext(
    TimeContext
  );

  const classes = useStyles();

  let itemsTodo = useItems().map((item) => {
    if (item.executed === true) {
      return (
        <Grid key={uuidv4()} container spacing={2}>
          {/**an item that is done */}
          <Grid item xs={7}>
            <Paper>
              <Typography
                id={item.id}
                onClick={(e) => toggleExecution(item.id, item.executed, e)}
                className={classes.ml1}
              >
                <del>
                  <li>
                    {" "}
                    title: {item.title} hour:{item.hour} invitation:{" "}
                    {item.invitation} location: {item.location} description:{" "}
                    {item.description}{" "}
                  </li>
                </del>
              </Typography>
            </Paper>
          </Grid>
          {/**the recicle bin */}
          <Grid item xs={1}>
            <Paper>
              <Button onClick={(e) => deleteTask(item.id, e)}>
                <FaTrash style={{ color: "blue" }} />
              </Button>
            </Paper>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid key={uuidv4()} container spacing={2}>
          {/**an item that is to be done */}
          <Grid item xs={7}>
            <Paper>
              <Typography
                id={item.id}
                onClick={(e) => toggleExecution(item.id, item.executed, e)}
                className={classes.ml1}
              >
                <li>
                  title: {item.title} hour:{item.hour} invitation:{" "}
                  {item.invitation} location: {item.location} description:{" "}
                  {item.description}
                </li>
              </Typography>
            </Paper>
          </Grid>
          {/**the recicle bin */}
          <Grid item xs={1}>
            <Paper>
              <Button onClick={(e) => deleteTask(item.id, e)}>
                <FaTrash style={{ color: "blue" }} />
              </Button>
            </Paper>
          </Grid>
        </Grid>
      );
    }
  });

  return (
    <>
      {/**Tasks for 16-04-2020 */}
      <Grid item xs={12}>
        <Paper className={classes.mr2}>
          <Typography className={classes.ml1} variant="h6">
            Tasks for{" "}
            {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}-
            {date.getMonth() < 10
              ? "0" + (date.getMonth() + 1)
              : date.getMonth() + 1}
            -{date.getFullYear()}{" "}
          </Typography>
        </Paper>
      </Grid>
      {/**all the tasks for the chosen day */}
      <Grid className={classes.mt1} item xs={12}>
        <Paper className={classes.mr2}>
          {loading ? (
            <Typography>Loading tasks...</Typography>
          ) : itemsTodo.length === 0 ? (
            <Typography>You have no tasks for this date</Typography>
          ) : (
            itemsTodo
          )}
        </Paper>
      </Grid>
    </>
  );
};

const useStyles = makeStyles({
  ml1: {
    marginLeft: "1rem",
  },
  mt1: {
    marginTop: "1rem",
  },
  mr2: {
    marginRight: "2rem",
  },
});
