import React, { useState } from "react";
import { Modal, Grid, Paper, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FaTrash, FaPen, FaTimes, FaFileAlt, FaClock, FaUserFriends, FaMapMarkerAlt, FaAlignLeft } from "react-icons/fa";

export const TitleDetails = (props) => {
  const {
    description,
    hour,
    invitation,
    location,
    day,
    month,
    title,
    executed,
    open,
    handleClose,
  } = props;
  const classes = useStyles();

  return (
    <Modal open={open} onClose={handleClose}>
      <Grid container className={classes.paper}>
        {/** first row tree icons */}
        <Grid container>
          <Grid item xs={6}></Grid>
          <Grid item xs={2}>
            <Button>
              <FaPen className={classes.color} />
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button>
              <FaTrash className={classes.color} />
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button>
              <FaTimes onClick={handleClose} className={classes.color} />
            </Button>
          </Grid>
        </Grid>
        {/**title */}
        <Grid className="mt-2" container>
          <Grid item xs={1}>
            <Typography align="center">
              <FaFileAlt className={classes.color} />
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Paper elevation={3}>
              <Typography>Title:</Typography>
            </Paper>
          </Grid>
          <Grid className="ml-2" item xs={8}>
            <Paper>
              <Typography align="center">{title}</Typography>
            </Paper>
          </Grid>
        </Grid>
        {/**clock hour */}
        <Grid className="mt-3" container>
          <Grid item xs={1}>
            <Typography className="ml-1" align="center">
              <FaClock className={classes.color} />
            </Typography>
          </Grid>
          <Grid item xs={2}>
              <Paper elevation={2}>
                  <Typography>
                      Time:
                  </Typography>
              </Paper>
          </Grid>
          <Grid item xs={2}>
              <Paper className="ml-2">
                  <Typography align="center">{hour}</Typography>
              </Paper>
          </Grid>
        </Grid>
        {/**Invitation */}
        <Grid className="mt-2" container>
            <Grid item xs={1}>
                <Typography align="center">
                    <FaUserFriends className={classes.color} />
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Paper>
                    <Typography>
                        Invitation:
                    </Typography>
                </Paper>
            </Grid>
            <Grid className="ml-2" item xs={6}>
                <Paper>
                    <Typography align="center">
                        {invitation}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
        {/**location */}
        <Grid className="mt-2" container>
            <Grid item xs={1}>
                <Typography align="center">
                    <FaMapMarkerAlt className={classes.color} />
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Paper elevation={2}>
                    <Typography>
                        Location:
                    </Typography>
                </Paper>
            </Grid>
            <Grid className="ml-2" item xs={6}>
                <Paper>
                    <Typography align="center">
                        {location}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
        {/**description */}
        <Grid className="mt-2 mb-3" container>
            <Grid item  xs={1}>
                <Typography align="center">
                    <FaAlignLeft className={classes.color} />
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Paper elevation={2}>
                    <Typography>
                        Description:
                    </Typography>
                </Paper>
            </Grid>
            <Grid className="ml-2" item xs={7}>
                <Paper>
                    <Typography align="center">
                        {description}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

const useStyles = makeStyles({
  paper: {
    position: "absolute",
    width: 400,
    background: "white",
    border: "2px solid #000",
    top: "20%",
    left: "20%",
  },
  color: {
    color: "blue",
  },
});
