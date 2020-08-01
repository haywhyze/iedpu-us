/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
// @material-ui/icons
import Close from '@material-ui/icons/Close';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';

import styles from 'assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js';
import profileStyles from 'assets/jss/material-kit-react/views/profilePage.js';
import LocationCity from '@material-ui/icons/LocationCity';

const useStyles = makeStyles(styles);
const useProfileStyles = makeStyles(profileStyles);

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

Transition.displayName = 'Transition';

export default function ProfileModal({ classicModal, setClassicModal, event }) {
  const classes = useStyles();
  const profileClasses = useProfileStyles();
  if (!event) return null;
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
              <div className={profileClasses.container}>
                <GridContainer justify="center">
                  <h3 style={{ textAlign: 'center' }}>{event.title}</h3>
                  <GridItem xs={12} sm={12}>
                    <GridItem xs={12} sm={12}>
                      <p style={{ whiteSpace: 'pre-wrap' }}>
                        {event.description}
                      </p>
                    </GridItem>
                    {event.venue && (
                      <GridItem xs={12} sm={12}>
                        <h5>
                          <LocationCity fontSize="small" />
                          {' '}
                          {event.venue}
                        </h5>
                      </GridItem>
                    )}
                    <GridItem xs={12} sm={12}>
                      <h5>
                        {new Intl.DateTimeFormat('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                        }).format(new Date(event.time))}
                      </h5>
                    </GridItem>
                  </GridItem>
                </GridContainer>
              </div>
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button
                onClick={() => setClassicModal(false)}
                color="danger"
                simple
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </GridItem>
      </GridContainer>
    </div>
  );
}
