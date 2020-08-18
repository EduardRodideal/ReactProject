import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  //holds the item to be search for
  const [search, setSearch] = useState(false);
  //holds all the shelves that we have
  const [shelves, setShelves] = useState({});
  //if true we see the shelf that we clicked on
  const [showShelf, setShowShelf] = useState(false);
  //holds the shelf that must be shown
  const [shelf, setShelf] = useState("");
  //used for update shelves
  const [update, setUpdate] = useState(false);
  //when true shows all the shelves
  const [showShelves, setShowShelves] = useState(false);
  //when true shows all the books
  const [showBooks, setShowBooks] = useState(false);
  //holds a new created shelf
  const [newShelf, setNewShelf] = useState("");
  //category of new shelf
  const [category, setCategory] = useState("");
  //holds all the shelves
  const [data, setData] = useState([]);
  //holds the books from the API
  const [stateBook1, setStateBook1] = useState(null);
  //holds the books from the API
  const [stateBook2, setStateBook2] = useState(null);
  //holds the books from the API
  const [stateBook3, setStateBook3] = useState(null);
  //holds the books from the API
  const [stateBook4, setStateBook4] = useState(null);
  //holds dark white mode
  const [dark, setDark] = useState("light");
  //if true shows the home page
  const [showHome, setShowHome] = useState(true);
  //holds the books with reviews
  const [booksWithReviews, setBooksWithReviews] = useState([]);
  //holds books that have reviews
  const [showBooksWithReviews, setShowBooksWithReviews] = useState(false);
  //if true shows progress circle
  const [showCircle, setShowCircle] = useState(false);
  //holds how many books will be founded
  const [value, setValue] = useState("10");
  //the books on the Books Shelves
  const [booksShelves, setBooksShelves] = useState([]);
  //shows booksShelves
  const [showBooksShelves, setShowBooksShelves] = useState(false);
  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        shelves,
        setShelves,
        showShelf,
        setShowShelf,
        shelf,
        setShelf,
        update,
        setUpdate,
        showShelves,
        setShowShelves,
        showBooks,
        setShowBooks,
        newShelf,
        setNewShelf,
        category,
        setCategory,
        data,
        setData,
        stateBook1,
        setStateBook1,
        stateBook2,
        setStateBook2,
        stateBook3,
        setStateBook3,
        stateBook4,
        setStateBook4,
        dark,
        setDark,
        showHome,
        setShowHome,
        booksWithReviews,
        setBooksWithReviews,
        showBooksWithReviews,
        setShowBooksWithReviews,
        showCircle,
        setShowCircle,
        value,
        setValue,
        booksShelves,
        setBooksShelves,
        showBooksShelves,
        setShowBooksShelves,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
