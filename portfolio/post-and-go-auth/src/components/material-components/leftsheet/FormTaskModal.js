import React, { useContext } from "react";
import { TimeContext } from "../../../context";
import { TextField, Grid, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  FaRegClock,
  FaUserFriends,
  FaMapMarkerAlt,
  FaAlignLeft,
} from "react-icons/fa";

export const FormTaskModal = () => {
  const {
    handleSubmit,
    date,
    setDate,
    check,
    setCheck,
    hour,
    setHour,
    selectedDate,
    location,
    setLocation,
    title,
    setTitle,
    invitation,
    setInvitation,
    description,
    setDescription,
  } = useContext(TimeContext);
  const classes = useStyles();

  const handleDateChange = (event) => {
    event.preventDefault();
    const time = event.target.value;
    const dateArray = time.split("-");
    console.log(time);
    let year = parseInt(dateArray[0]);
    let month = parseInt(dateArray[1]) - 1;
    let day = parseInt(dateArray[2]);
    const tempDate = date;

    //console.log(day);
    if (day < 32) {
      tempDate.setDate(day);
      tempDate.setFullYear(year);
      tempDate.setMonth(month);
      setDate(tempDate);
      setCheck(check + 1);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    let { value, name } = event.target;
    switch (name) {
      case "time":
        setHour(value);
        break;
      case "invitation":
        setInvitation(value);
        break;
      case "title":
        setTitle(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
    // setHour(tHour);
  };

  return (
    <Grid container className={classes.paper}>
      <Grid item xs={12}>
        <form>
          <Grid container>
            <Grid item xs={1}></Grid>
            {/**Add a title */}
            <Grid item xs={6}>
              <TextField
                id="standard-multiline-flexible"
                label="Add a title"
                multiline
                fullWidth
                rowsMax="8"
                value={title}
                onChange={handleChange}
                name="title"
              />
            </Grid>
            <Grid item xs={7}></Grid>
            {/**Meetings Memento Tasks */}
            <Grid className={classes.mt1} container>
              <Grid item xs={1}></Grid>
              <Grid item xs={11}>
                <Button variant="contained" className="text-capitalize">
                  Meetings
                </Button>
                <Button variant="contained" className="mx-2 text-capitalize">
                  Memento
                </Button>
                <Button variant="contained" className="text-capitalize">
                  Tasks
                </Button>
              </Grid>
            </Grid>
            {/**clock row */}
            <Grid className="mt-4" container>
              {/**clock icon */}
              <Grid item xs={1}>
                <Typography className="mt-3" align="center">
                  <FaRegClock className={classes.color} />
                </Typography>
              </Grid>
              {/**date change */}
              <Grid item xs={6}>
                <TextField
                  id="date"
                  label="Next appointment"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={selectedDate}
                  onChange={handleDateChange}
                  name="date"
                />
              </Grid>
              {/**time change */}
              <Grid item xs={3}>
                <TextField
                  id="time"
                  label="Hour"
                  type="time"
                  value={hour}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                  onChange={handleChange}
                  name="time"
                />
              </Grid>
            </Grid>
            {/**add invitation row */}
            <Grid container className="mt-3">
              <Grid item xs={1}>
                <Typography className="mt-4" align="center">
                  <FaUserFriends className={classes.color} />
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  id="filled-full-width"
                  placeholder="Add invitations"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="invitation"
                  onChange={handleChange}
                  value={invitation}
                />
              </Grid>
            </Grid>
            {/**add location row */}
            <Grid container>
              <Grid item xs={1}>
                <Typography className="mt-4" align="center">
                  <FaMapMarkerAlt className={classes.color} />
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  id="filled-full-width"
                  placeholder="Add a location"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="location"
                  onChange={handleChange}
                  value={location}
                />
              </Grid>
            </Grid>
            {/**add a description row */}
            <Grid container>
              <Grid item xs={1}>
                <Typography className="mt-4" align="center">
                  <FaAlignLeft className={classes.color} />
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  id="filled-full-width"
                  placeholder="Add a description"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="description"
                  onChange={handleChange}
                  value={description}
                />
              </Grid>
            </Grid>
            <Grid container className="my-4">
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>     
    </Grid>
  );
};

const useStyles = makeStyles({
  paper: {
    position: "fixed",
    width: 400,
    background: "white",
    border: "2px solid #000",
    top: "20%",
    left: "20%",        
  },
  mt1: {
    marginTop: "1rem",
  },
  height: {
    height: "1rem",
  },
  color: {
    color: "blue",
  },
  colcont: {
    border: "1px solid red",
  },
  opacity:{
      opacity:"0.1"
  }
});
