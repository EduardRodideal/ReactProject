import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { myCss } from "../pages/myCss";
import { SessionContext } from "../../../context2";

//Material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const styles = myCss;

const LogoutBtn = (props) => {
  const history = useHistory();
  const { classes } = props;
  const [open, setOpen] = useState(false);

  const { alert } = useContext(SessionContext);

  const token = localStorage.FBIdToken;

  const handleClick = () => {
    const token = localStorage.FBIdToken;
    if (token) {
      history.push("/agenda");
    } else {
    }
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClickYes = (event) => {
    localStorage.clear();
    history.push("/");
    setOpen((prev) => !prev);
  };

  const handleClickNo = () => {
    setOpen((prev) => !prev);
  };

  const handleClickIn = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.btnNav}>
        <Button disabled={alert} color="inherit" onClick={handleClick}>
          Logout
        </Button>
        {open ? (
          <Grid onClick={handleClickIn} className={classes.gridNav} container>
            <Grid item xs={12}>
              {token ? (
                <Typography className={classes.typography}>
                  Do you want to logout? <br />
                  <Button
                    onClick={handleClickYes}
                    className="ml-2"
                    variant="contained"
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={handleClickNo}
                    className="ml-2"
                    variant="contained"
                  >
                    No
                  </Button>
                </Typography>
              ) : (
                <Typography className={classes.typography}>
                  You are not logged in.
                </Typography>
              )}
            </Grid>
          </Grid>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};

LogoutBtn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LogoutBtn);
