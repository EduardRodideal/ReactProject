import React, {useEffect} from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

export const Home = () => {

    useEffect(() => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        axios.get(proxyurl +  "https://us-central1-agenda-34895.cloudfunctions.net/api/items")
        .then(res => {
            console.log(res.data, "hello from cross");
        })
        .catch(err => console.log(err));
    },[])
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
