import React, { useState, useContext } from "react";
import { dataBegin } from "./data";
import { SearchContext } from "./context/searchContext";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";

const ITEM_HEIGHT = 48;

export const AddToShelf = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {
    shelves,
    setShelves,
    update,
    setUpdate,
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
  } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOnly = () => {
    setAnchorEl(null);
  };

  const handleClose = (shelf) => {
    setAnchorEl(null);
    const splitShelf = shelf.split(": (cat) ");
    const shelfHasCategory = splitShelf.length > 1;
    const tempShelves = shelves;

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

    if (!shelves) {
      if (shelfHasCategory && splitShelf[1] === categories) {
        tempShelves[shelf] = [
          {
            title,
            publisher,
            publishedDate,
            image,
            description,
            authors,
            categories,
          },
        ];
      }
      if (!shelfHasCategory) {
        tempShelves[shelf] = [
          {
            title,
            publisher,
            publishedDate,
            image,
            description,
            authors,
            categories,
          },
        ];
      }
    } else {
      const objectKeys = Object.keys(shelves);
      //eliminate the book from another shelf
      for (let i = 0; i < objectKeys.length; i++) {
        //search in every shelf to erase the book from that shelf
        const shelfToSearch = tempShelves[objectKeys[i]];
        for (let j = 0; j < shelfToSearch.length; j++) {
          if (
            JSON.stringify(shelfToSearch[j]) ===
            JSON.stringify({
              title,
              publisher,
              publishedDate,
              image,
              description,
              authors,
              categories,
            })
          ) {
            shelfToSearch.splice(j, 1);
            tempShelves[objectKeys[i]] = shelfToSearch;
          }
        } //end inner for
      } //end outer for

      if (objectKeys.includes(shelf)) {
        const tempShelf = tempShelves[shelf];
        let isShelfContained = false;
        //check if that shelf has already the book
        for (let i = 0; i < tempShelf.length; i++) {
          if (
            JSON.stringify(tempShelf[i]) ===
            JSON.stringify({
              title,
              publisher,
              publishedDate,
              image,
              description,
              authors,
              categories,
            })
          ) {
            isShelfContained = true;
          }
        }
        if (!isShelfContained && splitShelf[1] === categories) {
          tempShelves[shelf].push({
            title,
            publisher,
            publishedDate,
            image,
            description,
            authors,
            categories,
          });
        }
        if (!isShelfContained && !shelfHasCategory) {
          tempShelves[shelf].push({
            title,
            publisher,
            publishedDate,
            image,
            description,
            authors,
            categories,
          });
        }
      } else {
        if (shelfHasCategory && splitShelf[1] === categories) {
          tempShelves[shelf] = [
            {
              title,
              publisher,
              publishedDate,
              image,
              description,
              authors,
              categories,
            },
          ];
        }
        if (!shelfHasCategory) {
          tempShelves[shelf] = [
            {
              title,
              publisher,
              publishedDate,
              image,
              description,
              authors,
              categories,
            },
          ];
        }
      }
    }
    setShelves(tempShelves);
    setUpdate(!update);
  };

  return (
    <div>
      <Tooltip title="Add the book to a shelve">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleCloseOnly}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            widht: "20ch",
          },
        }}
      >
        {dataBegin.map((shelf) => (
          <MenuItem
            key={shelf}
            selected={shelf === null}
            onClick={() => handleClose(shelf)}
          >
            {shelf}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
