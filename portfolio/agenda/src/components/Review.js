import React, { useContext } from "react";
import { SearchContext } from "./context/searchContext";
// import { v4 as uuidv4 } from "uuid";
// import { Book } from "./Book";

//Material-UI stuff
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export const Review = (props) => {
  const {
    stateBook1,
    setStateBook1,
    stateBook2,
    setStateBook2,
    stateBook3,
    setStateBook3,
    stateBook4,
    setStateBook4,
    booksShelves,
  } = useContext(SearchContext);
  const {
    title,
    publisher,
    publishedDate,
    image,
    description,
    authors,
    categories,
    review,
    stars,
    tempReview,
    setTempReview,
    setPermanentReview,
  } = props;

  const handleChange = (e) => {
    e.preventDefault();
    setTempReview(e.target.value);
  };

  const handleReview = (e) => {
    e.preventDefault();
    if (tempReview === "") return;

    //add book to Books Shelves
    let hasBooksShelves = false;
    for (let i = 0; i < booksShelves.length; i++) {
      if (
        booksShelves[i].title === title &&
        booksShelves[i].publishedDate === publishedDate
      ) {
        hasBooksShelves = true;
      }
    }

    if (!hasBooksShelves) {
      const tempBooksShelves = booksShelves;
      tempBooksShelves.push({
        title,
        publisher,
        publishedDate,
        image,
        description,
        authors,
        categories,
        review,
        stars,
      });
    }

    for (let i = 0; i < stateBook1.length; i++) {
      if (
        stateBook1[i].title === title &&
        stateBook1[i].publishedDate === publishedDate
      ) {
        const tempStateBook1 = stateBook1;
        tempStateBook1[i].review = tempReview;
        setStateBook1(tempStateBook1);
        setPermanentReview(tempReview);
      }
    }

    for (let i = 0; i < stateBook2.length; i++) {
      if (
        stateBook2[i].title === title &&
        stateBook2[i].publishedDate === publishedDate
      ) {
        const tempStateBook2 = stateBook2;
        tempStateBook2[i].review = tempReview;
        setStateBook2(tempStateBook2);
        setPermanentReview(tempReview);
      }
    }

    for (let i = 0; i < stateBook3.length; i++) {
      if (
        stateBook3[i].title === title &&
        stateBook3[i].publishedDate === publishedDate
      ) {
        const tempStateBook3 = stateBook3;
        tempStateBook3[i].review = tempReview;
        setStateBook3(tempStateBook3);
        setPermanentReview(tempReview);
      }
    }

    for (let i = 0; i < stateBook4.length; i++) {
      if (
        stateBook4[i].title === title &&
        stateBook4[i].publishedDate === publishedDate
      ) {
        const tempStateBook4 = stateBook4;
        tempStateBook4[i].review = tempReview;
        setStateBook4(tempStateBook4);
        setPermanentReview(tempReview);
      }
    }

    setTempReview("");
  };

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item>
        <TextField
          className="text-aria"
          id="filled-textarie"
          label=""
          placeholder="Add a review"
          multiline
          onChange={handleChange}
          variant="outlined"
          size="small"
          rows="1"
          value={tempReview}
        />
        <Button
          onClick={handleReview}
          variant="contained"
          className="btn-search"
          size="large"
          disableElevation={true}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
};
