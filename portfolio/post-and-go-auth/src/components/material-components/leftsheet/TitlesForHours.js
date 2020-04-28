import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TimeContext } from "../../../context";
import { FaTrash } from "react-icons/fa";
import { Grid, Paper, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TitleDetails } from "./TitleDetails";

//renders all titles for the chosen date in the corresponding
//hour fields and empty hour fields if no titles for that hour
export const TitlesForHours = () => {
  const { useItems, isModal, setIsModal } = useContext(
    TimeContext
  );

  const [description, setDescription] = useState("");
  const [hour, setHour] = useState("");
  const [invitation, setInvitation] = useState("");
  const [location, setLocation] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [title, setTitle] = useState("");
  const [executed, setExecuted] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleClick = (desc, hours, invit, loc, day, month, title, ex, event) => {
    event.stopPropagation();
    setOpen(true);
    setTitle(title);
    setHour(hours);
    setInvitation(invit);
    setLocation(loc);
    setDescription(desc);
  };

  const handleHourClick = () => {
    setIsModal(true);
  }

  //it's a comparator used for sorting an array of objects
  const compare = (a, b) => {
    const hourA = a.hour;
    const hourB = b.hour;
    let comparison = 0;
    if (hourA > hourB) {
      comparison = 1;
    } else if (hourA < hourB) {
      comparison = -1;
    }
    return comparison;
  };

  const classes = useStyles();
  //gets all the meetings for one day
  const itemsTodoSorted = useItems();
  //sorts the meetings by hours in asced.
  itemsTodoSorted.sort(compare);

  //returns all the rows of the agenda
  const getRows = () => {
    const sheetRows = [];

    //one iteration for each row of the agenda
    for (let i = 0; i < 24; i++) {
      let hour = 0;
      let hourEnd = 0;
      if (i < 10) {
        hour = `0${i}:00`;
        if (i === 9) {
          hourEnd = `${i + 1}:00`;
        } else {
          hourEnd = `0${i + 1}:00`;
        }
      } else {
        hour = `${i}:00`;
        hourEnd = `${i + 1}:00`;
      }
      const titlesSortedPerHour = itemsTodoSorted.filter(
        (item) => item.hour >= hour && item.hour < hourEnd
      );
      const gridXs = Math.floor(10 / titlesSortedPerHour.length);
      const titlesMappedGridItems = titlesSortedPerHour.map((item) => {
        const des = item.description;
        const hour = item.hour;
        const inv = item.invitation;
        const loc = item.location;
        const day = item.day;
        const month = item.month;
        const title = item.title;
        const ex = item.executed;
        return (
          //titles for one hour row
          <Grid className={classes.itemmy} key={uuidv4()} item xs={gridXs}>
            <Paper
              className={classes.mr}
              elevation={3}
              onClick={(event) =>
                handleTitleClick(des, hour, inv, loc, day, month, title, ex, event)
              }
            >
              <Typography align="center">{item.title}</Typography>
            </Paper>
          </Grid>
        );
      });
      sheetRows.push(
        //one row for each hour
        <Grid onClick={handleHourClick} className={classes.bor} key={uuidv4()} container>
          <Grid item xs={1}>
            <Typography align="center" className={classes.my}>
              {hour}
            </Typography>
          </Grid>
          {titlesMappedGridItems}
          <Grid item xs={1}></Grid>
        </Grid>
      );
    } //end for (let i = 0; i < 24; i++)
    return sheetRows;
  }; //end method getRows()

  return (
    <>
      {getRows()}
      <TitleDetails
        title={title}
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        hour={hour}
        invitation={invitation}
        location={location}
        description={description}
      />
    </>
  );
};

const mar = 2;

const useStyles = makeStyles({
  width: {
    width: "2.9rem",
    height: "2rem",
    marginLeft: "0.9rem",
    display: "inlineBlock",
  },
  my: {
    paddingTop: "0.5rem",
    marginLeft: "0.9rem",
  },
  se: {
    height: "2rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
  },
  bor: {
    borderBottom: "1px solid grey",
    marginTop: "0.5rem",
    marginRight: `${mar}rem`,
  },
  itemmy: {
    marginBottom: "0.5rem",
  },
  mr: {
    marginRight: "0.2rem",
  },
});
