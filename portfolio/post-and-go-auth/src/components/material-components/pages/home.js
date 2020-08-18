import React, { useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";

//Material-ui
import Grid from "@material-ui/core/Grid";

export const Home = () => {
  const history = useHistory();
  console.log("Hello form home");
  useEffect(() => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    axios
      .get(
        proxyurl +
          "https://us-central1-agenda-34895.cloudfunctions.net/api/items"
      )
      .then((res) => {
        console.log(res.data, "hello from cross");
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
      const token = localStorage.FBIdToken;
      const decodedToken = jwtDecode(token);
      const time = (decodedToken.exp * 1000) - (Date.now()) - (3595 * 1000)
      console.log(time/1000, "the time");

    setTimeout(() => {
        localStorage.clear();
        history.push("/");
    }, time);
    return () => clearTimeout();    
  });

   // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setDate(new Date(), 1000);
  //   });
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        <p>Content...</p>
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile...</p>
      </Grid>
    </Grid>
  );
};
