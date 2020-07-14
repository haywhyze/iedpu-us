/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import Button from 'components/CustomButtons/Button.js';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/components/typographyStyle.js';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { db } from '../../pages/_app';
import PayPalButtons from './PayPalButtons';

const useStyles = makeStyles(styles);

export default function Donate() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const registerDonations = (payload) => {
    db.collection('donations')
      .add(payload)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.log('Error adding document', error);
      });
  };

  return (
    <>
      <Button onClick={handleClickOpen} color="primary" round>
        Donate
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ textAlign: 'center' }}
      >
        <DialogTitle id="alert-dialog-title">Donate to IEDPU - USA</DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            style={{ textAlign: 'justify' }}
            gutterBottom
          >
            As a non-governmental organisation, we need your support to help
            make a difference in the lives of people worldwide. Your
            contributions will make a difference in the health and livelihood of
            many people, and together we can help shape the future of global
            health for all.
          </Typography>
          <Typography
            variant="body1"
            style={{ textAlign: 'justify' }}
            gutterBottom
          >
            Click the button below to help support IEDPU USA branch
          </Typography>
          <br />
          <Typography
            variant="body1"
            style={{ textAlign: 'justify' }}
            gutterBottom
          >
            How much will you like to donate?
          </Typography>
          <br />
          <FormControl className={classes.margin} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
          <PayPalButtons
            amount={amount}
            setAmount={setAmount}
            description="Donation"
            handleClose={handleClose}
            registerDonations={registerDonations}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
