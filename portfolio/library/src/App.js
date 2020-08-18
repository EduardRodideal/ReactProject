import React, { useContext, useEffect } from "react";
import "./App.css";
import { dataBegin } from "./components/data";
import { Navbar } from "./components/Navbar";
import { Books } from "./components/Books";
import { AlphabetShelf } from "./components/AlphabetShelf";
import { SearchContext } from "./components/context/searchContext";
import { ShelfWithBooks } from "./components/ShelfWithBooks";
import { HomePage } from "./components/HomePage";
import { ShelfWithReviews } from "./components/ShelfWithReviews";
import { CircularInterminate } from "./components/CircularInterminate";
import { BooksShelves } from "./components/BooksShelves";

//Material UI stuff
import Paper from "@material-ui/core/Paper";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

export const App = () => {
  const {
    showShelf,
    showShelves,
    showBooks,
    setData,
    dark,
    showHome,
    showBooksWithReviews,
    showCircle,
    showBooksShelves,
  } = useContext(SearchContext);
  useEffect(() => {
    setData(dataBegin);
  }, [setData]);
  const theme = createMuiTheme({
    palette: {
      type: dark,
      primary: {
        main: "#40c4ff",
      },
    },
  });
  return (
    <Paper>
      <ThemeProvider theme={theme}>
        <div>
          <Navbar />
          {showBooksShelves && <BooksShelves />}
          {showCircle && <CircularInterminate />}
          {showHome && <HomePage />}
          {showShelf && <ShelfWithBooks />}
          {showShelves && <AlphabetShelf />}
          {showBooks && <Books />}
          {showBooksWithReviews && <ShelfWithReviews />}
        </div>
      </ThemeProvider>
    </Paper>
  );
};
