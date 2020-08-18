import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {SessionContext} from "../../../context2";

import PropTypes from "prop-types";
import { myCss } from "../pages/myCss";

//Material-ui
import Grid from "@material-ui/core/Grid";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = myCss;

const LoginBtn = (props) => {
  const history = useHistory();
  const { classes } = props;
  const [open, setOpen] = useState(false);

  const {alert} = useContext(SessionContext);

  const handleClick = () => {
    const token = localStorage.FBIdToken;
    if (token) {
      setOpen((prev) => !prev);
    } else {
      history.push("/");
    }    
  };

  const handleClickAway = () => {
    setOpen(false);
  };  

  const handleClickIn = () => {
    setOpen(false);
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.btnNav}>
        <Button disabled={alert} color="inherit" onClick={handleClick}>
          Login
        </Button>
        {open ? (
          <Grid onClick={handleClickIn} className={classes.gridNav} container>
            <Grid item xs={12}>
              <Typography className={classes.typography}>
                You are loged in. If you wand to login with another
                account, please first log out.
              </Typography>
            </Grid>
          </Grid>
        ) : null}
      </div>
    </ClickAwayListener>
  );  
};

LoginBtn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginBtn);
