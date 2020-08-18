import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { myCss } from "../pages/myCss";
import { SessionContext } from "../../../context2";

//Material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const styles = myCss;

const HomeBtn = (props) => {
  const history = useHistory();
  const { classes } = props;
  const [open, setOpen] = useState(false);

  const { alert } = useContext(SessionContext);

  const handleClick = () => {
    const token = localStorage.FBIdToken;
    if (token) {
      history.push("/agenda");
    } else {
      setOpen((prev) => !prev);
    }
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClickIn = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.btnNav}>
        <Button disabled={alert} color="inherit" onClick={handleClick}>
          Home
        </Button>
        {open ? (
          <Grid onClick={handleClickIn} className={classes.gridNav} container>
            <Grid item xs={12}>
              <Typography className={classes.typography}>
                You must first to login
              </Typography>
            </Grid>
          </Grid>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};

HomeBtn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeBtn);
