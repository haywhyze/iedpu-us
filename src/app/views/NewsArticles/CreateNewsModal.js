import React, { useState } from 'react';
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
import Close from '@material-ui/icons/Close';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import CardBody from 'components/Card/CardBody.js';

import styles from 'assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js';
import profileStyles from 'assets/jss/material-kit-react/views/profilePage.js';
import { db } from '../../pages/_app.js';

const useStyles = makeStyles(styles);
const useProfileStyles = makeStyles(profileStyles);

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

Transition.displayName = 'Transition';

export default function CreateNewsModal({
  classicModal,
  setClassicModal,
  setSuccessNotification,
  setFailureNotification,
  setErrorMessage,
  setSuccessMessage,
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
    details: '',
    caption: '',
  });
  const [imageUrl, setImageUrl] = useState('');

  const uploadPhoto = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: 'haywhyze',
        uploadPreset: 'ittv3vvm',
        sources: ['local', 'camera', 'facebook', 'instagram'],
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: 'local',
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#90A0B3',
            tabIcon: '#0078FF',
            menuIcons: '#5A616A',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#0078FF',
            action: '#FF620C',
            inactiveTabIcon: '#0E2F5A',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#E4EBF1',
          },
          fonts: {
            default: {
              active: true,
            },
          },
        },
      },
      (err, info) => {
        if (!err) {
          if (info.event === 'success') {
            // console.log(info.info.secure_url)
            setImageUrl(info.info.secure_url);
          }
        }
      },
    );
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const createNews = () => {
    const newPost = {
      ...values,
      author: 'Admin',
      time: new Date().toISOString(),
      imageUrl,
    };

    db.collection('news')
      .add(newPost)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        setValues({
          title: '', details: '', venue: '', caption: '',
        });
        setImageUrl('');
        setClassicModal(false);
        setSuccessMessage('News post successfully created');
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
                    <h2>Create New Post</h2>
                  </GridItem>
                  <GridItem xs={12}>
                    <CustomInput
                      labelText="Heading"
                      id="title"
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
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Details"
                      id="details-modal"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'details',
                        value: values.details,
                        onChange: handleChange,
                        multiline: true,
                        rows: 5,
                      }}
                    />
                  </GridItem>
                  <GridItem style={{ marginTop: '27px' }} xs={12} sm={12} md={6}>
                    <Button
                      className="makeStyles-formControl-428"
                      onClick={uploadPhoto}
                      color="info"
                    >
                      <i className={`${classes.socials} fas fa-camera`} />
                      Upload Image
                    </Button>
                    <img
                      src={imageUrl || '../img/profile.png'}
                      alt="..."
                      width={50}
                      height={50}
                      style={{ objectFit: 'cover' }}
                      className={`${imageClasses} makeStyles-formControl-428`}
                    />
                  </GridItem>
                  <GridItem xs={12}>
                    <CustomInput
                      labelText="Image Caption"
                      id="caption-modal"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'caption',
                        value: values.caption,
                        onChange: handleChange,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button onClick={createNews} color="primary">
                Create Post
              </Button>
            </DialogActions>
          </Dialog>
        </GridItem>
      </GridContainer>
    </div>
  );
}
