import React, { useContext } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { TitlesForHours } from "../leftsheet/TitlesForHours";
import { FormTaskModal } from "../leftsheet/FormTaskModal";
import { TimeContext } from "../../../context";

export const LeftSide = () => {
  const { isModal, setIsModal } = useContext(TimeContext);

  const handleClick = () => {
    setIsModal(false);
  };

  const handleTaskClick = (event) => {
    event.stopPropagation();
  };

  const classes = useStyles();
  return (
    <>
      <Grid container spacing={1}>
        <TitlesForHours />
      </Grid>
      {/* {isModal && (
        <Grid container>
          <Grid item xs={5}>
            <FormTaskModal />
          </Grid>
        </Grid>
      )} */}
      {isModal && (
        <Grid onClick={handleClick} className={classes.opac} container>
          <Grid container>
            <Grid onClick={(event) => handleTaskClick(event)} item xs={5}>
              <FormTaskModal />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

const useStyles = makeStyles({
  opac: {
    top: "0%",
    left: "0%",
    opacity: "1",
    position: "absolute",
    width: "65%",
    height: "145%",          
  },
});
