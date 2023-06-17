import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Confirm from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { db } from '../../pages/_app';

const useStyles = makeStyles(styles);

export default function ConfirmCell({
  user,
}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendWelcomeMail = (uid, name) => {
    db.collection('mail').add({
      toUids: [uid],
      message: {
        subject: 'Welcome to the IEDPU - USA Family!',
        text: `
        Hi, ${name}
        Your account has been verified and you can now connect with other members of the community.

        You can also keep up with the latest news and events and also settle your membership fees with ease.
        
        You can log in now and update your profile so others in the community can get to know about you.
        
        Click https://iedpuusa.org/profile to update your profile
        `,
        html: `
        <p>Hi, ${name}</p>
        <p>Your account has been verified and you can now connect with other members of the community.</p>
        <p>You can also keep up with the latest news and events and also settle your membership fees with ease.</p>
        <p>You can log in now and update your profile so others in the community can get to know about you.</p>        
        Click <a href="https://iedpuusa.org/profile">here</a> to update your profile.
        <p>Best Regards,</p>
        <p>IEDPU - USA Team.</p>
        `,
      },
    }).then(() => console.log('Queued email for delivery')).catch((err) => console.log(err));
  };

  const verifyUser = (uid, name) => {
    // console.log(uid);
    db.collection('Users')
      .doc(uid)
      .update({ verified: true })
      .then(() => {
        sendWelcomeMail(uid, name);
        toast.success('User Successfully Verified');
      })
      .catch((error) => {
        toast.error(`Error verifying user, ${error.message}`);
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
        <DialogTitle id="alert-dialog-title">Verify User</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to verify this user as a member of IEDPU - USA
            branch?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => verifyUser(user.id, user.displayName)} color="primary">
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
