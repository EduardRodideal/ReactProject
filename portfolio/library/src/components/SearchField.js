import React, { useState, useContext } from "react";
import request from "superagent";
import { SearchContext } from "./context/searchContext";

//Material-UI stuff
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

export const SearchField = () => {
  const {
    search,
    setSearch,
    setShowBooks,
    setStateBook1,
    setStateBook2,
    setStateBook3,
    setStateBook4,
    setShowHome,
    setShowCircle,
  } = useContext(SearchContext);
  //this is the book to be founded
  const [book, setBook] = useState("");
  const booksArray = [];
  const booksArray2 = [];
  const booksArray3 = [];
  const booksArray4 = [];

  const handleChange = (e) => {
    e.preventDefault();
    setBook(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowCircle(true);
    if (book === "") return;
    request
      .get("https://www.googleapis.com/books/v1/volumes")
      .query({ q: book, maxResults: 10, startIndex: 0 })
      .then((data) => {
        console.log(data.body.items);

        data.body.items.map((item) => booksArray.push(item));
        const booksArrayReduced = [];
        booksArray.map((item) =>
          booksArrayReduced.push({
            title: item.volumeInfo.title,
            image: item.volumeInfo.imageLinks
              ? item.volumeInfo.imageLinks.thumbnail
              : "No image",
            publisher: item.volumeInfo.publisher,
            publishedDate: item.volumeInfo.publishedDate,
            categories: item.volumeInfo.categories
              ? item.volumeInfo.categories[0]
              : "Unknown category",

            description: item.volumeInfo.description,
            authors: item.volumeInfo.authors
              ? item.volumeInfo.authors[0]
              : "Unknown",
          })
        );
        setStateBook1(booksArrayReduced);
        //localStorage.setItem("books", JSON.stringify(booksArray));
        //console.log(booksArray, "arrays of books");

        request
          .get("https://www.googleapis.com/books/v1/volumes")
          .query({ q: book, maxResults: 40, startIndex: 10 })
          .then((data2) => {
            //data2.body.items.map((item) => booksArray2.push(item));
            data2.body.items.map((item) => booksArray2.push(item));
            const booksArrayReduced = [];
            booksArray2.map((item) =>
              booksArrayReduced.push({
                title: item.volumeInfo.title,
                image: item.volumeInfo.imageLinks
                  ? item.volumeInfo.imageLinks.thumbnail
                  : "No image",
                publisher: item.volumeInfo.publisher,
                publishedDate: item.volumeInfo.publishedDate,
                categories: item.volumeInfo.categories
                  ? item.volumeInfo.categories[0]
                  : "Unknown category",

                description: item.volumeInfo.description,
                authors: item.volumeInfo.authors
                  ? item.volumeInfo.authors[0]
                  : "Unknown",
              })
            );
            setStateBook2(booksArrayReduced);
            // setStateBook2(booksArray2);
            //localStorage.setItem("books2", JSON.stringify(booksArray2));
          });

        request
          .get("https://www.googleapis.com/books/v1/volumes")
          .query({ q: book, maxResults: 40, startIndex: 50 })
          .then((data3) => {
            //data3.body.items.map((item) => booksArray3.push(item));

            data3.body.items.map((item) => booksArray3.push(item));
            const booksArrayReduced = [];
            booksArray3.map((item) =>
              booksArrayReduced.push({
                title: item.volumeInfo.title,
                image: item.volumeInfo.imageLinks
                  ? item.volumeInfo.imageLinks.thumbnail
                  : "No image",
                publisher: item.volumeInfo.publisher,
                publishedDate: item.volumeInfo.publishedDate,
                categories: item.volumeInfo.categories
                  ? item.volumeInfo.categories[0]
                  : "Unknown category",

                description: item.volumeInfo.description,
                authors: item.volumeInfo.authors
                  ? item.volumeInfo.authors[0]
                  : "Unknown",
              })
            );
            setStateBook3(booksArrayReduced);
            // setStateBook3(booksArray3);
            //localStorage.setItem("books3", JSON.stringify(booksArray3));
          });

        request
          .get("https://www.googleapis.com/books/v1/volumes")
          .query({ q: book, maxResults: 40, startIndex: 90 })
          .then((data4) => {
            // data4.body.items.map((item) => booksArray4.push(item));

            data4.body.items.map((item) => booksArray4.push(item));
            const booksArrayReduced = [];
            booksArray4.map((item) =>
              booksArrayReduced.push({
                title: item.volumeInfo.title,
                image: item.volumeInfo.imageLinks
                  ? item.volumeInfo.imageLinks.thumbnail
                  : "No image",
                publisher: item.volumeInfo.publisher,
                publishedDate: item.volumeInfo.publishedDate,
                categories: item.volumeInfo.categories
                  ? item.volumeInfo.categories[0]
                  : "Unknown category",

                description: item.volumeInfo.description,
                authors: item.volumeInfo.authors
                  ? item.volumeInfo.authors[0]
                  : "Unknown",
              })
            );
            setStateBook4(booksArrayReduced);

            // setStateBook4(booksArray4);
            //localStorage.setItem("books4", JSON.stringify(booksArray4));
          });
      })
      .then(() => {
        setSearch(!search);
        // setBook("");
        setShowBooks(true);
        setShowHome(false);
        setShowCircle(false);
        console.log("Helllo from setShowCircle");
      });
    // .then(() => {
    //   setShowCircle(false);
    // });
  };

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item>
        <form noValidate onSubmit={handleSearch}>
          <TextField
            className="text-aria"
            type="text"
            id="filled-textarie"
            label=""
            placeholder="Search book"
            // multiline
            onChange={handleChange}
            variant="outlined"
            size="small"
            rows="1"
          />
          <Button
            type="submit"
            onClick={handleSearch}
            variant="contained"
            className="btn-search"
            size="large"
            disableElevation={true}
          >
            <SearchIcon />
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};
