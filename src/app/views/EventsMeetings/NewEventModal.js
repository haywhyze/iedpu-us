import React, { useState } from "react";
// @material-ui/core components
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DialogActions from "@material-ui/core/DialogActions";
import { toast } from "react-toastify";
// @material-ui/icons
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomDateTimePicker from "components/CustomInput/CustomDatePicker";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";
import { db } from "../../pages/_app.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

Transition.displayName = "Transition";

export default function NewEventModal({ classicModal, setClassicModal }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    title: "",
    description: "",
    venue: "",
  });
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const createEvent = () => {
    const newEvent = {
      ...values,
      author: "Admin",
      time: selectedDate.toISOString(),
    };

    db.collection("events")
      .add(newEvent)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setValues({ title: "", description: "", venue: "" });
        handleDateChange(new Date());
        setClassicModal(false);
        toast.success("Event successfully created");
      })
      .catch((error) => {
        toast.error(`Error creating event, ${error.message}`);
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
                    <h3>Create New Event</h3>
                  </GridItem>
                  <GridItem xs={12}>
                    <CustomInput
                      labelText="Title"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: "title",
                        value: values.title,
                        onChange: handleChange,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12}>
                    <CustomInput
                      labelText="Venue"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: "venue",
                        value: values.venue,
                        onChange: handleChange,
                      }}
                    />
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
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Description"
                      id="about-me"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: "description",
                        value: values.description,
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
              <Button onClick={createEvent} color="primary">
                Create Event
              </Button>
            </DialogActions>
          </Dialog>
        </GridItem>
      </GridContainer>
    </div>
  );
}
