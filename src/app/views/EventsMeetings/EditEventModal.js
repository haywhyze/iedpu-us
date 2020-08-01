/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import InputLabel from '@material-ui/core/InputLabel';
import classNames from 'classnames';
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
import { toast } from 'react-toastify';
import Close from '@material-ui/icons/Close';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import CardBody from 'components/Card/CardBody.js';

import styles from 'assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js';
import profileStyles from 'assets/jss/material-kit-react/views/profilePage.js';
import TextEditor from '../../Sections/utils/TextEditor';
import { db } from '../../pages/_app.js';

const useStyles = makeStyles(styles);
const useProfileStyles = makeStyles(profileStyles);

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

Transition.displayName = 'Transition';

export default function EditEventModal({
  classicModal,
  setClassicModal,
  event,
}) {
  const classes = useStyles();
  const profileClasses = useProfileStyles();
  const imageClasses = classNames(
    profileClasses.imgRaised,
    profileClasses.imgRoundedCircle,
    // profileClasses.imgFluid
  );
  const [values, setValues] = useState({
    title: '',
  });
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('');
  const [selectedDate, handleDateChange] = useState(new Date());

  useEffect(() => {
    if (event) {
      const {
        title, time,
      } = event;
      setValues({ title });
      setDescription(event.description);
      setVenue(event.venue);
      handleDateChange(new Date(time));
    }
  }, [event]);

  if (!event) return null;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const createEvent = () => {
    const newEvent = {
      ...values,
      venue,
      description,
      author: 'Admin',
      time: selectedDate.toISOString(),
    };

    if (event) {
      db.collection('events')
        .doc(event.id)
        .update(newEvent)
        .then(() => {
          setValues({ title: '', description: '', venue: '' });
          setClassicModal(false);
          toast.success('Event successfully updated');
        })
        .catch((error) => {
          toast.error(`Error updating event, ${error.message}`);
        });
    }
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
            fullScreen
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
                    <h3>Edit Event</h3>
                  </GridItem>
                  <GridItem xs={12}>
                    <CustomInput
                      labelText="Title"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'title',
                        value: values.title,
                        onChange: handleChange,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12}>
                    <div style={{ paddingLeft: '1rem' }}>
                      <InputLabel style={{ margin: '2rem 0 0.5rem 0' }}>Venue</InputLabel>
                      <TextEditor text={venue} setText={setVenue} options={['link']} />
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <div style={{ paddingLeft: '1rem' }}>
                      <InputLabel style={{ margin: '2rem 0 0.5rem 0' }}>Description</InputLabel>
                      <TextEditor text={description} setText={setDescription} />
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <CustomDateTimePicker
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
                </GridContainer>
              </CardBody>
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button onClick={createEvent} color="primary">
                Update Event
              </Button>
            </DialogActions>
          </Dialog>
        </GridItem>
      </GridContainer>
    </div>
  );
}
