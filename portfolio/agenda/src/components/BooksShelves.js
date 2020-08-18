import React, { useContext } from "react";
import { SearchContext } from "./context/searchContext";
import { Book } from "./Book";
import { v4 as uuidv4 } from "uuid";

//Material-UI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

export const BooksShelves = () => {
  const { booksShelves } = useContext(SearchContext);

  let allBooks = booksShelves;

  const booksArray = [];

  allBooks.map((item) =>
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

  //   for (let i = 0; i < allBooks.length; i++) {
  //     if (Array.isArray(allBooks) && booksShelves !== null) {
  //       if (allBooks[i] !== null) {
  //         allBooks[i].map((item) =>
  //           booksArray.push(
  //             <Grid key={uuidv4()} item xs={2}>
  //               <Book
  //                 title={item.title}
  //                 image={item.image}
  //                 publisher={item.publisher}
  //                 publishedDate={item.publishedDate}
  //                 categories={item.categories}
  //                 description={item.description}
  //                 authors={item.authors}
  //                 review={item.review}
  //                 stars={item.stars}
  //               />
  //             </Grid>
  //           )
  //         );
  //       }
  //     }
  //   }//end inner

  return (
    <div className="grid-container">
      <Paper className="paper">
        <Grid container>
          <Grid item sm={12}>
            <Typography align="center" variant="h5">
              Books Lists
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
