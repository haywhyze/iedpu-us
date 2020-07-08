/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import Button from 'components/CustomButtons/Button.js';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import PayPalButtons from './PayPalButtons';


export default function PayFees({
  amount, user, intent, db,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const registerPayments = (payload) => {
    console.log('start registration');
    const newFee = {
      amount: payload.amount,
      intent,
      transaction_id: payload.transaction_id,
      name: payload.name,
      email: payload.email,
      userId: user.uid,
      date: Date.parse(payload.date),
    };
    db.collection('membership_fees')
      .add(newFee)
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
        Pay Now
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ textAlign: 'center' }}
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">Pay Membership Fees</DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            style={{ textAlign: 'center' }}
            gutterBottom
          >
            Click either of the button below to pay
            {' '}
            $
            {amount}
            {' '}
            for
            {' '}
            {intent}
          </Typography>
          <br />
          <PayPalButtons
            amount={amount}
            handleClose={handleClose}
            description={intent}
            registerPayments={registerPayments}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
