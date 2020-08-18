import React, { useState } from "react";
import { AddToShelf } from "./AddToShelf";
import { BookDetails } from "./BookDetails";

//Material-UI stuff
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minHeight: 420,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export const Book = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  // const [stars, setStars] = useState(2)
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

  const [currentStars, setCurrentStars] = useState(stars ? stars : 1);
  const [tempReview, setTempReview] = useState(review);
  const [permanentReview, setPermanentReview] = useState(review);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <AddToShelf
            title={title}
            publisher={publisher}
            publishedDate={publishedDate}
            image={image}
            description={description}
            authors={authors}
            categories={categories}
            review={review}
            stars={stars}
          />
        }
        title={title.substring(0, 12)}
        subheader={authors && "Author:  " + authors.substring(0, 30)}
      />
      <CardMedia className={classes.media} image={image} title={title} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {"Publisher:  " + publisher + ", " + publishedDate}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorite">
          {/* <FavoriteIcon /> */}
          <BookDetails
            title={title}
            publisher={publisher}
            publishedDate={publishedDate}
            image={image}
            description={description}
            authors={authors}
            categories={categories}
            stars={stars}
            review={review}
            currentStars={currentStars}
            setCurrentStars={setCurrentStars}
            tempReview={tempReview}
            setTempReview={setTempReview}
            permanentReview={permanentReview}
            setPermanentReview={setPermanentReview}
          />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Title: {title}</Typography>
          <Typography paragraph>Categories: {categories}</Typography>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
