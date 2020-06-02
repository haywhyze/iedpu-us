import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);
import { db } from "../pages/_app";

export default function DeleteCell({
  user,
  setSuccessNotification,
  setFailureNotification,
  setErrorMessage,
  setSuccessMessage,
}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUser = (uid) => {
    // console.log(uid);
    db.collection("Users")
      .doc(uid)
      .delete()
      .then(function () {
        console.log("Document successfully removed!");
        setSuccessMessage("User successfully deleted!");
        setSuccessNotification(true);
        setTimeout(() => {
          setSuccessNotification(false);
        }, 3000);
      })
      .catch(function (error) {
        setFailureNotification(true);
        setErrorMessage(error.message);
        console.error("Error removing document: ", error);
      });
    setOpen(false);
  };

  return (
    <>
      <Tooltip
        id="tooltip-top"
        title="Delete Member"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton
          onClick={handleClickOpen}
          aria-label="Delete"
          className={classes.tableActionButton}
        >
          <Delete
            className={classes.tableActionButtonIcon + " " + classes.edit}
          />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Verify User"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this user as a member of IEDPU - US
            branch?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteUser(user.id)} color="primary">
            Yes, please
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No, cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
