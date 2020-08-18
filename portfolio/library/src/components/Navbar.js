import React, { useContext } from "react";
import { SearchContext } from "./context/searchContext";
import { AddShelf } from "./AddShelf";
import { SearchField } from "./SearchField";
import { DarkWhiteMode } from "./DarkWhiteMode";
import {NumberOfResults} from "./NumberOfResults";

//Material-UI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export const Navbar = () => {
  const {
    setShowShelves,
    setShowBooks,
    setShowShelf,
    setShowHome,
    setShowBooksWithReviews,
    setShowBooksShelves,
  } = useContext(SearchContext);

  const handleClickShelf = () => {
    setShowShelves(true);
    setShowBooksShelves(false)
    setShowBooks(false);
    setShowShelf(false);
    setShowHome(false);
    setShowBooksWithReviews(false);
  };

  const handleClickBooks = () => {
    // if (stateBook1 === {}) return;
    setShowBooks(true);
    setShowBooksShelves(false);
    setShowShelves(false);
    setShowShelf(false);
    setShowHome(false);
    setShowBooksWithReviews(false);
  };

  const handleClickBooksShleves = () => {
    // if (stateBook1 === {}) return;
    setShowBooksShelves(true)
    setShowBooks(false);
    setShowShelves(false);
    setShowShelf(false);
    setShowHome(false);
    setShowBooksWithReviews(false);
  };

  const handleClickHome = () => {
    setShowHome(true);
    setShowBooksShelves(false)
    setShowShelves(false);
    setShowShelf(false);
    setShowBooksWithReviews(false);
  };

  const handleClickReview = () => {
    setShowBooksWithReviews(true);
    setShowBooksShelves(false)
    setShowShelves(false);
    setShowBooks(false);
    setShowShelf(false);
    setShowHome(false);
  }

  return (
    <div className="navbar">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Grid alignItems="center" container>
            <Grid item sm={3}>
              <SearchField />
            </Grid>
            <Grid item sm={2}>
              <NumberOfResults />
            </Grid>
            <Grid item sm>
              <Typography align="left">
                {/* <Button onClick={handleClickHome}>Home</Button> */}
                <Button onClick={handleClickBooks}>Home</Button>
                <Button onClick={handleClickBooksShleves}>Books Lists</Button>
                <Button onClick={handleClickShelf}>Shelves</Button>
                <Button onClick={handleClickReview}>Shelf with Review</Button>
                <Button onClick={handleClickHome}>Library</Button>
              </Typography>
            </Grid>
            <Grid item sm={1}>
              <AddShelf />
            </Grid>
            <Grid item sm={1}>
              <DarkWhiteMode />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};
