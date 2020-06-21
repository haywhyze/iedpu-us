import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Confirm from "@material-ui/icons/Check";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { db } from "../../pages/_app";

const useStyles = makeStyles(styles);

export default function ConfirmCell({
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

  const verifyUser = (uid) => {
    // console.log(uid);
    db.collection("Users")
      .doc(uid)
      .update({ verified: true })
      .then(function () {
        console.log("Document successfully written!");
        setSuccessMessage("User successfully verified!");
        setSuccessNotification(true);
        setTimeout(() => {
          setSuccessNotification(false);
        }, 3000);
      })
      .catch(function (error) {
        setFailureNotification(true);
        setErrorMessage(error.message);
        console.error("Error writing document: ", error);
      });
    setOpen(false);
  };

  return (
    <>
      <Tooltip
        id="tooltip-top"
        title="Confirm Member"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton
          onClick={handleClickOpen}
          aria-label="Confirm"
          className={classes.tableActionButton}
        >
          <Confirm
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
            Are you sure you want to verify this user as a member of IEDPU - US
            branch?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => verifyUser(user.id)} color="primary">
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
