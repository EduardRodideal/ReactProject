import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { SearchContext } from "./context/searchContext";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
    marginTop: "2rem",
  },
});

export const RatingStars = (props) => {
  const { stateBook1, setStateBook1 } = useContext(SearchContext);
  const { title, publishedDate, currentStars, setCurrentStars } = props;
  // const [currentStars, setCurrentStars] = useState(stars ? stars : 1);
  const [hover, setHover] = useState(-1);
  const classes = useStyles();

  const handleStarsChange = (event, newValue) => {
    for (let i = 0; i < stateBook1.length; i++) {
      if (
        stateBook1[i].title === title &&
        stateBook1[i].publishedDate === publishedDate
      ) {
        const tempStateBook1 = stateBook1;
        tempStateBook1[i].stars = newValue;
        setStateBook1(tempStateBook1);
        setCurrentStars(newValue);
        console.log(tempStateBook1, "new book");
      }
    }
  };

  return (
    <div className={classes.root}>
      Rating: {"     "}
      <Rating
        name="hover-feedback"
        value={currentStars}
        precision={0.5}
        onChange={handleStarsChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {currentStars !== null && (
        <Box ml={2}>{labels[hover !== -1 ? hover : currentStars]}</Box>
      )}
    </div>
  );
};
