import React, { useContext } from "react";
import { SearchContext } from "./context/searchContext";
import { Book } from "./Book";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { v4 as uuidv4 } from "uuid";

export const ShelfWithReviews = () => {
  const { stateBook1, stateBook2, stateBook3, stateBook4, } = useContext(
    SearchContext
  );
  const cardBooksWithReviews = [];
  //search from stateBook1
  if (stateBook1) {
    for (let i = 0; i < stateBook1.length; i++) {
      if (stateBook1[i].review) {
        cardBooksWithReviews.push(
          <Grid key={uuidv4()} item xs={2}>
            <Book
              title={stateBook1[i].title}
              image={stateBook1[i].image}
              publisher={stateBook1[i].publisher}
              publishedDate={stateBook1[i].publishedDate}
              categories={stateBook1[i].categories}
              description={stateBook1[i].description}
              authors={stateBook1[i].authors}
              review={stateBook1[i].review}
              stars={stateBook1[i].stars}
            />
          </Grid>
        );
      }
    }
  }

   //search from stateBook2
   if (stateBook2) {
    for (let i = 0; i < stateBook2.length; i++) {
      if (stateBook2[i].review) {
        cardBooksWithReviews.push(
          <Grid key={uuidv4()} item xs={2}>
            <Book
              title={stateBook2[i].title}
              image={stateBook2[i].image}
              publisher={stateBook2[i].publisher}
              publishedDate={stateBook2[i].publishedDate}
              categories={stateBook2[i].categories}
              description={stateBook2[i].description}
              authors={stateBook2[i].authors}
              review={stateBook2[i].review}
              stars={stateBook2[i].stars}
            />
          </Grid>
        );
      }
    }
  }

  //search from stateBook3
  if (stateBook3) {
    for (let i = 0; i < stateBook3.length; i++) {
      if (stateBook3[i].review) {
        cardBooksWithReviews.push(
          <Grid key={uuidv4()} item xs={2}>
            <Book
              title={stateBook3[i].title}
              image={stateBook3[i].image}
              publisher={stateBook3[i].publisher}
              publishedDate={stateBook3[i].publishedDate}
              categories={stateBook3[i].categories}
              description={stateBook3[i].description}
              authors={stateBook3[i].authors}
              review={stateBook3[i].review}
              stars={stateBook3[i].stars}
            />
          </Grid>
        );
      }
    }
  }

  //search from stateBook4
  if (stateBook4) {
    for (let i = 0; i < stateBook4.length; i++) {
      if (stateBook4[i].review) {
        cardBooksWithReviews.push(
          <Grid key={uuidv4()} item xs={2}>
            <Book
              title={stateBook4[i].title}
              image={stateBook4[i].image}
              publisher={stateBook4[i].publisher}
              publishedDate={stateBook4[i].publishedDate}
              categories={stateBook4[i].categories}
              description={stateBook4[i].description}
              authors={stateBook4[i].authors}
              review={stateBook4[i].review}
              stars={stateBook4[i].stars}
            />
          </Grid>
        );
      }
    }
  }

  return (
    <div className="grid-container">
      <Paper className="paper">
        <Grid container>
          <Grid item sm={12}>
            <Typography align="center" variant="h5">
              Shelf whith reviews
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {cardBooksWithReviews}
        </Grid>
      </Paper>
    </div>
  );
};
