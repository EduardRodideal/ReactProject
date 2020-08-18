import React, { useContext } from "react";
import { SearchContext } from "./context/searchContext";
import { Book } from "./Book";
import { v4 as uuidv4 } from "uuid";

//Material-UI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

export const Books = () => {
  const { stateBook1, stateBook2, stateBook3, stateBook4, value } = useContext(
    SearchContext
  );
  // const stateBook1 = JSON.parse(localStorage.getItem("books"));
  // const stateBook2 = JSON.parse(localStorage.getItem("books2"));
  // const stateBook3 = JSON.parse(localStorage.getItem("books3"));
  // const stateBook4 = JSON.parse(localStorage.getItem("books4"));

  //const allBooks = [stateBook1, stateBook2, stateBook3, stateBook4];
  let allBooks;
  if (value === "10") {
    allBooks = [stateBook1];
  } else {
    allBooks = [stateBook1, stateBook2, stateBook3, stateBook4];
  }
  const booksArray = [];

  for (let i = 0; i < allBooks.length; i++) {
    if (Array.isArray(allBooks) && stateBook1 !== null) {
      if (allBooks[i] !== null) {
        allBooks[i].map((item) =>
          booksArray.push(
            <Grid key={uuidv4()} item xs={2}>
              <Book
                title={item.title}
                image={item.image}
                publisher={item.publisher}
                publishedDate={item.publishedDate}
                categories={item.categories}
                description={item.description}
                authors={item.authors}
                review={item.review}
                stars={item.stars}
              />
            </Grid>
          )
        );
      }
    }
  }//end inner

  return (
    <div className="grid-container">
      <Paper className="paper">
        <Grid container>
          <Grid item sm={12}>
            <Typography align="center" variant="h5">
              Home Page
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {booksArray}
        </Grid>
      </Paper>
    </div>
  );
};
