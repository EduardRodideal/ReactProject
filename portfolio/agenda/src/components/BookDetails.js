import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SearchContext } from "./context/searchContext";
import { Review } from "./Review";
import { RatingStars } from "./RatingStars";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import IconButton from "@material-ui/core/IconButton";

//Material-UI stuff
import Modal from "@material-ui/core/Modal";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "60%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "10%",
    left: "23%",
  },
}));

export const BookDetails = (props) => {
  const { data } = useContext(SearchContext);
  const {
    title,
    publisher,
    publishedDate,
    description,
    authors,
    categories,
    image,
    tempReview,
    setTempReview,
    currentStars,
    setCurrentStars,
    permanentReview,
    setPermanentReview,
  } = props;
  const classes = useStyles();
  const tempData = data;
  tempData.sort();

  const [open, setOpen] = useState(false);
  // const [review, setReview] = useState("");
  // const [stars, setStars] = useState(2);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <Grid
        container
        alignItems="center"
        justify="center"
        className="text-aria"
      >
        <Grid item sm={12}>
          <Typography align="right">
            <IconButton onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Typography>
        </Grid>
        <Grid item md={1} sm={2}>
          <Typography variant="body1">Title:</Typography>
        </Grid>
        <Grid item sm={11}>
          <Typography variant="h6">{title} </Typography>
        </Grid>
        <Grid item sm={2} md={2}>
          <Typography variant="body1">Category:</Typography>
        </Grid>
        <Grid item sm={10} md={10}>
          <Typography variant="h6">{categories}</Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography variant="body1">Description:</Typography>
        </Grid>
        <Grid item sm={12}>
          {description && description.length > 300 ? (
            <Typography>{description.slice(0, 1000)}</Typography>
          ) : (
            <Typography>{description}</Typography>
          )}
          {/* <Typography>{description}</Typography> */}
        </Grid>
        <Grid item sm={3} md={2}>
          <Typography variant="body1">Publisher:</Typography>
        </Grid>
        <Grid item sm={9} md={10}>
          <Typography variant="h6">{publisher}</Typography>
        </Grid>
        <Grid item sm={3} md={2}>
          <Typography variant="body1">Published Date:</Typography>
        </Grid>
        <Grid item sm={9} md={10}>
          <Typography variant="h6">{publishedDate}</Typography>
        </Grid>
        <Grid item sm={3} md={2}>
          <Typography variant="body1">Author:</Typography>
        </Grid>
        <Grid item sm={9} md={10}>
          <Typography variant="h6">{authors}</Typography>
        </Grid>
        <Grid item sm={3} md={2}>
          <Typography variant="body1">Review:</Typography>
        </Grid>
        <Grid item sm={9} md={10}>
          <Typography variant="body1">{permanentReview}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <RatingStars
          title={title}
          publishedDate={publishedDate}
          currentStars={currentStars}
          setCurrentStars={setCurrentStars}

        />
      </Grid>
      <Review
        publisher={publisher}
        title={title}
        publishedDate={publishedDate}
        description={description}
        authors={authors}
        categories={categories}
        tempReview={tempReview}
        setTempReview={setTempReview}
        image={image}
        setPermanentReview={setPermanentReview}
      />
    </div>
  );

  return (
    <div>
      <Tooltip
        onClick={handleOpen}
        title="More information about the book"
        aria-label="More information about the book"
      >
        <Typography variant="body1">Details</Typography>
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
