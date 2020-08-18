import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SearchContext } from "./context/searchContext";

//Material-UI stuff
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "40%",
    left: "35%",
  },
}));

export const AddShelf = () => {
  const {
    data,
    setData,
    setNewShelf,
    newShelf,
    category,
    setCategory,
  } = useContext(SearchContext);
  const classes = useStyles();
  let tempData = data;
  tempData.sort();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewShelf(e.target.value);
  };

  const handleChangeCategory = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  const handleCreateShelf = (shelf) => {
    let shelfFirstPart = shelf.charAt(0).toUpperCase();
    let shelfSecondPart = shelf.slice(1).toLowerCase();
    let convertedShelf = shelfFirstPart + shelfSecondPart;
    tempData.push(`${convertedShelf}: (cat) ${category}`);
    console.log(tempData, "tempData");
    tempData = tempData.sort();
    console.log(tempData, "tempDataSorted");
    setData(tempData);
    setNewShelf("");
    setOpen(false);
    setCategory("");
  };

  const body = (
    <div className={classes.paper}>
      <Grid
        container
        alignItems="center"
        justify="center"
        className="text-aria"
        spacing={3}
      >
        <Grid item sm={6}>
          <TextField
            id="filled-textarie"
            label="Create new shelf"
            placeholder="New Shelf"
            multiline
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            id="filled-textarie-category"
            label="Shelf category"
            placeholder="Category"
            multiline
            onChange={handleChangeCategory}
            variant="outlined"
          />
        </Grid>
        <Grid item sm={12}>
          <Button
            onClick={() => handleCreateShelf(newShelf)}
            variant="contained"
            className="btn-search"
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <Tooltip
        onClick={handleOpen}
        title="Add a shelf"
        aria-label="Add a shelf"
      >
        <IconButton>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};
