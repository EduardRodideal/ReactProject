import React, { useContext } from "react";
import { SearchContext } from "./context/searchContext";
import { Book } from "./Book";
import { v4 as uuidv4 } from "uuid";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export const ShelfWithBooks = () => {
  const { shelves, shelf } = useContext(SearchContext);
  const allShelves = Object.keys(shelves);
  const isBookOnShelf = allShelves.includes(shelf);
  const bookOnShelf = [];
  if (isBookOnShelf) {
    const tempShelf = shelves[shelf];
    tempShelf.map((book) =>
      bookOnShelf.push(
        <Grid key={uuidv4()} item xs={2}>
          <Book
            title={book.title}
            image={book.image ? book.image : "No image"}
            publisher={book.publisher}
            categories={book.categories}
            publishedDate={book.publishedDate}
            description={book.description}
            authors={book.authors ? book.authors : "Unknown"}
          />
        </Grid>
      )
    );
  }
  const noBooksOnShelf = <h2>No books on this shelf</h2>;
  return (
    <div>
      {bookOnShelf.length > 0 && (
        <div className="grid-container">
          <Grid container spacing={2}>
              <Grid item sm={4} ></Grid>
              <Grid item sm={4} >
                  <Typography align="center" variant="h4">
                      Shelf: {shelf}
                  </Typography>
              </Grid>
              <Grid item sm={4} ></Grid>
            {bookOnShelf}
          </Grid>
        </div>
      )}
      {bookOnShelf.length === 0 && noBooksOnShelf}
    </div>
  );
};
