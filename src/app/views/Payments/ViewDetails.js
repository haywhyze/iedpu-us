/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import Button from 'components/CustomButtons/Button.js';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Muted from 'components/Typography/Muted';
import Primary from 'components/Typography/Primary';

export default function ViewDetails({
  amount, intent, name,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} color="info" round>
        View Details
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ textAlign: 'center' }}
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">{`IEDPU ${intent}`}</DialogTitle>
        <DialogContent>
          <Muted>Name: </Muted>
          {' '}
          <Primary>{name}</Primary>

        </DialogContent>
      </Dialog>
    </>
  );
}
