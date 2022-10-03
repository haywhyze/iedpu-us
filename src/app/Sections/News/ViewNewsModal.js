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
import Card from 'components/Card/Card.js';
import CardFooter from 'components/Card/CardFooter';

// @material-ui/icons
import Close from '@material-ui/icons/Close';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';

import styles from 'assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js';
import profileStyles from 'assets/jss/material-kit-react/views/profilePage.js';

const useStyles = makeStyles(styles);
const useProfileStyles = makeStyles(profileStyles);

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

Transition.displayName = 'Transition';

export default function ProfileModal({ classicModal, setClassicModal, news }) {
  const classes = useStyles();
  const profileClasses = useProfileStyles();
  if (!news) return null;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6} lg={4}>
          <Dialog
            classes={{
              root: classes.center,
              paper: classes.modal,
            }}
            maxWidth="md"
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
                <h3 style={{ textAlign: 'center' }}>{news.title}</h3>
                <Card>
                  <img
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      borderTopRightRadius: 'calc(.4rem - 1px)',
                      borderTopLeftRadius: 'calc(.4rem - 1px)',
                    }}
                    src={news.image}
                    alt="..."
                  />
                  <CardFooter>
                    <p style={{ marginBottom: '0', marginTop: '10px' }}>{news.caption}</p>
                  </CardFooter>
                </Card>
                <p style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{__html: news.details}} />
                <h6>
                  {new Intl.DateTimeFormat('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  }).format(new Date(news.time))}
                </h6>
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
