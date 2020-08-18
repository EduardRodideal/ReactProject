import React from "react";
import { FaPlus, FaRegClock, FaAlignLeft, FaPenAlt, FaTimes } from "react-icons/fa";

//Material-ui stuff
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";


const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[1],
    padding: theme.spacing(2, 6, 2, 2),
    top: "40%",
    left: "30%",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 120,
  },
}));

export const ModalPlus = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={3}>
            <Grid justify="flex-end" container>
                <Grid item xs={1}>
                    <FaTimes className="faTimes" />
                </Grid>
            </Grid>
          <Grid alignItems="flex-end" container>
            <Grid item xs={1}>
              <FaPenAlt />
            </Grid>
            <Grid item xs={11}>
              <TextField fullWidth={true} id="standard-basic" label="Title" />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid alignItems="flex-end" container>
              <Grid item xs={1}>
                <FaAlignLeft />
              </Grid>
              <Grid item xs={11}>
                <TextareaAutosize
                  className="aria"
                  rowsMin={4}
                  aria-label="empty textarea"
                  placeholder="Description"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid alignItems="flex-end" container>
              <Grid item xs={1}>
                <FaRegClock />
              </Grid>
              <Grid item xs={11}>
                <form className={classes.container} noValidate>
                  <TextField
                    id="time"
                    label="Alarm clock"
                    type="time"
                    defaultValue="07:30"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );

  return (
    <div>
      <FaPlus className="plus" onClick={handleOpen} />
      <Modal
        BackdropProps={{ invisible: true }}
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
