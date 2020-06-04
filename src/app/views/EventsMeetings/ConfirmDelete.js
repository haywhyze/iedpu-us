import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { db } from '../../pages/_app.js';

const useStyles = makeStyles(styles);

export default function DeleteCell({
  id,
  setFailureNotification,
  setErrorMessage,
}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteEvent = (uid) => {
    // console.log(uid);
    db.collection('events')
      .doc(uid)
      .delete()
      .then(() => {
        console.log('Document successfully removed!');
        setErrorMessage('Event successfully deleted!');
        setFailureNotification(true);
        setTimeout(() => {
          setFailureNotification(false);
        }, 3000);
      })
      .catch((error) => {
        setFailureNotification(true);
        setTimeout(() => {
          setFailureNotification(false);
        }, 3000);
        setErrorMessage(error.message);
        console.error('Error removing event: ', error);
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
            className={`${classes.tableActionButtonIcon} ${classes.edit}`}
          />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Event</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteEvent(id)} color="primary">
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
