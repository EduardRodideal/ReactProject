import React, { useState, useContext } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../../../images/pngwave.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { myCss } from "./myCss";
import SessionExpired from "./SessionExpired";
import { SessionContext } from "../../../context2";

//Material-ui stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = myCss;

const Login = (props) => {
  const { classes } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { alert } = useContext(SessionContext);

  const userData = {
    email,
    password,
  };

  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(
        proxyurl +
          "https://us-central1-agenda-34895.cloudfunctions.net/api/login",
        userData
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        setLoading(false);
        props.history.push("/agenda");
      })
      .catch((err) => {
        setErrors(err.response.data);
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  return (
    <>     
      {!alert && (
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <img src={AppIcon} alt="agenda" className={classes.image} />
            <Typography variant="h2" className={classes.pageTitle}>
              Login
            </Typography>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                className={classes.textField}
                id="email"
                name="email"
                type="email"
                label="Email"
                value={email}
                onChange={handleChange}
                fullWidth
                helperText={errors.email}
                error={errors.email ? true : false}
              />
              <TextField
                className={classes.textField}
                id="password"
                name="password"
                type="password"
                label="Password"
                value={password}
                onChange={handleChange}
                fullWidth
                helperText={errors.password}
                error={errors.password ? true : false}
              />
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={loading}
              >
                Login
                {loading && (
                  <CircularProgress
                    size={30}
                    color="secondary"
                    className={classes.progress}
                  />
                )}
              </Button>
              <br />
              <small>
                Don't have an account ? sign up <Link to="/signup">here</Link>
              </small>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      )}
    </>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
