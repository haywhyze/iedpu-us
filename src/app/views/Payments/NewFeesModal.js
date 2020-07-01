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

export default function NewFeesModal({
  feesModal,
  setFeesModal,
}) {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
    price: '',
  });
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const createFee = () => {
    const newFee = {
      ...values,
      expiryDate: selectedDate.toISOString(),
    };

    db.collection('fees')
      .add(newFee)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        setValues({ name: '', price: '' });
        handleDateChange(new Date());
        setFeesModal(false);
        // setSuccessMessage('Fee successfully created');
      })
      .catch((error) => {
        console.log('Error adding document', error);
        // setErrorMessage(error.message);
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
            open={feesModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setFeesModal(false)}
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
                onClick={() => setFeesModal(false)}
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
                    <h3>Create New Fee</h3>
                  </GridItem>
                  <GridItem xs={12}>
                    <CustomInput
                      labelText="Name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'name',
                        value: values.name,
                        onChange: handleChange,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12}>
                    <CustomInput
                      labelText="Price"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'price',
                        type: 'number',
                        value: values.price,
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
                      <InputLabel>Deadline for Payment of Fee</InputLabel>
                    </MuiPickersUtilsProvider>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button onClick={createFee} color="primary">
                Create Fee
              </Button>
            </DialogActions>
          </Dialog>
        </GridItem>
      </GridContainer>
    </div>
  );
}
