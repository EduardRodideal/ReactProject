import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { SearchContext } from "./context/searchContext";

//Material-UI
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import FolderIcon from "@material-ui/icons/Folder";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const AlphabetShelf = () => {
  const { setShowShelf, setShelf, setShowShelves, data } = useContext(SearchContext);
  const classes = useStyles();
  const shelvesOfBooks = [];
  const shelvesOfBooks1 = [];
  const shelvesOfBooks2 = [];
  let tempShelves = [];
  let temp = "A";

  const handleClick = (shelf) => {
    setShowShelf(true);
    setShelf(shelf);
    setShowShelves(false);
  };

  for (let i = 0; i < data.length; i++) {
    //first third of the bookshelves
    if (temp !== data[i].substring(0, 1) && i < data.length / 3) {
      shelvesOfBooks.push(
        <List
          key={uuidv4()}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              <Typography className="fontic" variant="h6">
                {temp}
              </Typography>
            </ListSubheader>
          }
          className={classes.root}
        >
          {tempShelves}
        </List>
      );
      temp = data[i].substring(0, 1);
      tempShelves = [];
    }
    //second third of the bookshelves
    if (
      temp !== data[i].substring(0, 1) &&
      i >= data.length / 3 &&
      i < (data.length / 3) * 2
    ) {
      shelvesOfBooks1.push(
        <List
          key={uuidv4()}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              <Typography className="fontic" variant="h6">
                {temp}
              </Typography>
            </ListSubheader>
          }
          className={classes.root}
        >
          {tempShelves}
        </List>
      );
      temp = data[i].substring(0, 1);
      tempShelves = [];
    }
    //third part of the bookshelves
    if (
      temp !== data[i].substring(0, 1) &&
      i >= (data.length / 3) * 2
    ) {
      shelvesOfBooks2.push(
        <List
          key={uuidv4()}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              <Typography className="fontic" variant="h6">
                {temp}
              </Typography>
            </ListSubheader>
          }
          className={classes.root}
        >
          {tempShelves}
        </List>
      );
      temp = data[i].substring(0, 1);
      tempShelves = [];
    }

    tempShelves.push(
      <ListItem onClick={() => handleClick(data[i])} key={uuidv4()} button>
        <ListItemIcon>
          <FolderIcon className="col" />
        </ListItemIcon>
        <ListItemText primary={data[i]} />
      </ListItem>
    );
  }

  return (
    <div>
      <Grid container>
        <Grid item sm={12}>
          <Typography align="center" variant="h5">
            All the shelves
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item sm>
          {shelvesOfBooks}
        </Grid>
        <Grid item sm>
          {shelvesOfBooks1}
        </Grid>
        <Grid item sm>
          {shelvesOfBooks2}
        </Grid>
      </Grid>
    </div>
  );
};
