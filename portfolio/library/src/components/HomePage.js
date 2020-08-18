import React from "react";

//Material-UI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import Paper from "@material-ui/core/Paper";

export const HomePage = () => {
  return (
    <Paper className="paper">
      <Grid spacing={3} container>
        <Grid item sm={12}>
          <Typography variant="h3" align="center">
            Welcome to your library
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography className="ml" variant="h5">
            <MenuBookIcon color="primary" /> {"    "}
            In order to find a book use the search bar
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography className="ml" variant="h5">
            <MenuBookIcon color="primary" /> {"    "}
            Click the Books Lists button to see all the books in your library
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography className="ml" variant="h5">
            <MenuBookIcon color="primary" /> {"    "}
            Click the Home button to see all the books that were found
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography className="ml" variant="h5">
            <MenuBookIcon color="primary" /> {"    "}
            Click the on the radio buttons to change the number of books you want to find
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography className="ml" variant="h5">
            <MenuBookIcon color="primary" /> {"    "}
            Click the Shelves button to see all your shelves
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography className="ml" variant="h5">
            <MenuBookIcon color="primary" /> {"    "}
            Click the Shelf With Review button to see all the books that have reviews
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography className="ml" variant="h5">
            <MenuBookIcon color="primary" /> {"    "}
            Click the plus icon to add a shelf and a category
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography className="ml" variant="h5">
            <MenuBookIcon color="primary" /> {"    "} Click the star icon to
            switch dark/light mode
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
