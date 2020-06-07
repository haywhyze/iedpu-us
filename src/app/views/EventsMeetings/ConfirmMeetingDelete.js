import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from 'components/CustomButtons/Button.js';
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

  const deleteMeeting = (uid) => {
    // console.log(uid);
    db.collection('meetings')
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
        title="Delete Meeting"
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
        <DialogTitle id="alert-dialog-title">Delete Meeting</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this meeting?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteMeeting(id)} color="danger">
            Yes, please
          </Button>
          <Button onClick={handleClose} color="transparent" autoFocus>
            No, cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
