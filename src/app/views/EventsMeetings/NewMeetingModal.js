import React, { useState } from 'react';
// @material-ui/core components
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DialogActions from '@material-ui/core/DialogActions';
// @material-ui/icons
import CustomInput from 'components/CustomInput/CustomInput.js';
import CustomDateTimePicker from 'components/CustomInput/CustomDatePicker';
import Close from '@material-ui/icons/Close';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import CardBody from 'components/Card/CardBody.js';

import styles from 'assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js';
import { db } from '../../pages/_app.js';

const useStyles = makeStyles(styles);

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

Transition.displayName = 'Transition';

export default function NewMeetingModal({
  classicModal,
  setClassicModal,
  setSuccessNotification,
  setFailureNotification,
  setErrorMessage,
  setSuccessMessage,
}) {
  const classes = useStyles();
  const [values, setValues] = useState({
    meetingNotes: '',
    venue: '',
  });

  const [selectedDate, handleDateChange] = useState(new Date());

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const createMeeting = () => {
    const newMeeting = {
      ...values,
      author: 'Admin',
      time: selectedDate.toISOString(),
    };

    db.collection('meetings')
      .add(newMeeting)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        setValues({ meetingNotes: '', venue: '' });
        setClassicModal(false);
        setSuccessMessage('Meeting successfully created');
        setTimeout(() => {
          setSuccessNotification(false);
        }, 3000);
        setSuccessNotification(true);
      })
      .catch((error) => {
        console.log('Error adding document', error);
        setErrorMessage(error.message);
        setFailureNotification(true);
        setTimeout(() => {
          setFailureNotification(false);
        }, 3000);
      });
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6} lg={4}>
          <Dialog
            classes={{
              root: classes.center,
              paper: classes.modal,
            }}
            open={classicModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setClassicModal(false)}
            aria-labelledby="classic-modal-slide-title"
            aria-describedby="classic-modal-slide-description"
          >
            <DialogTitle
              id="classic-modal-slide-title"
              disableTypography
              className={classes.modalHeader}
            >
              <IconButton
                className={classes.modalCloseButton}
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => setClassicModal(false)}
              >
                <Close className={classes.modalClose} />
              </IconButton>
            </DialogTitle>
            <DialogContent
              id="classic-modal-slide-description"
              className={classes.modalBody}
            >
              <CardBody>
                <GridContainer>
                  <GridItem xs={12}>
                    <h2>Create New Meeting</h2>
                  </GridItem>
                  <GridItem xs={12}>
                    <CustomInput
                      labelText="Venue"
                      id="venue"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'venue',
                        value: values.venue,
                        onChange: handleChange,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <CustomDateTimePicker
                        id="date-time"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        value={selectedDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                      />
                      <InputLabel>Date and Time</InputLabel>
                    </MuiPickersUtilsProvider>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Minutes of Meeting (Meeting Notes)"
                      id="about-me"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'meetingNotes',
                        value: values.meetingNotes,
                        onChange: handleChange,
                        multiline: true,
                        rows: 5,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button onClick={createMeeting} color="primary">
                Create Meeting
              </Button>
            </DialogActions>
          </Dialog>
        </GridItem>
      </GridContainer>
    </div>
  );
}
