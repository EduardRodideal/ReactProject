import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../../../images/pngwave.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { myCss } from "./myCss";

//Material-ui stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = myCss;

const Signup = (props) => {
  const { classes } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const newUserData = {
    email,
    password,
    confirmPassword,
    username,
  };

  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(
        proxyurl +
          "https://us-central1-agenda-34895.cloudfunctions.net/api/signup",
        newUserData
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
    if (name === "confirmPassword") setConfirmPassword(value);
    if (name === "username") setUsername(value);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="agenda" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
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
          <TextField
            className={classes.textField}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
            fullWidth
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
          />
          <TextField
            className={classes.textField}
            id="username"
            name="username"
            type="text"
            label="Username"
            value={username}
            onChange={handleChange}
            fullWidth
            helperText={errors.username}
            error={errors.username ? true : false}
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
            Signup
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
            Already have an account ? login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
