import React, { useContext } from "react";
import { myCss } from "./myCss";
import { SessionContext } from "../../../context2";
import { useHistory } from "react-router-dom";

//Material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const styles = myCss;

const SessionExpired = (props) => {
  const { classes } = props;
  const history = useHistory();

  const {setAlert } = useContext(SessionContext);

  const handleClick = () => {
    localStorage.clear();
    history.push("/");
    setAlert((prev) => !prev)
  }

  return (
    <Grid className={classes.sessionExpired} container>
      <Grid className={classes.sessionInfo} container>
        <Grid item xs>
          <Paper className="p-3">
            <Typography>
              Your session has expired. You need to login again
            </Typography>
            <Typography align="center">
              <Button onClick={handleClick} variant="contained" color="primary">
                Ok
              </Button>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(SessionExpired);
