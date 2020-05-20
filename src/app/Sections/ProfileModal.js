import React from "react";
// @material-ui/core components
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Typography from "@material-ui/core/Typography";

import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";
import profileStyles from "assets/jss/material-kit-react/views/profilePage.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Phone from "@material-ui/icons/Phone";
import Email from "@material-ui/icons/Email";
import Work from "@material-ui/icons/Work";
import LocationCity from "@material-ui/icons/LocationCity";

const useStyles = makeStyles(styles);
const useProfileStyles = makeStyles(profileStyles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function ProfileModal({
  classicModal,
  setClassicModal,
  member,
}) {
  const classes = useStyles();
  const profileClasses = useProfileStyles();
  const imageClasses = classNames(
    profileClasses.imgRaised,
    profileClasses.imgRoundedCircle
    // profileClasses.imgFluid
  );
  if (!member) return null;
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
                  <div className={profileClasses.profile}>
                    <div>
                      <img
                        style={{ transform: "translate3d(0, -5%, 0)" }}
                        src={member.photoURL + "?height=300"}
                        alt={member.displayName}
                        className={imageClasses}
                      />
                    </div>
                    <div>
                      <Typography gutterBottom variant="h5" component="h2">
                        {member.displayName}
                      </Typography>
                      <List component="section">
                        <ListItem>
                          <ListItemIcon>
                            <Email />
                          </ListItemIcon>
                          <ListItemText primary={member.email} />
                        </ListItem>
                        {member.phone && (
                          <ListItem>
                            <ListItemIcon>
                              <Phone />
                            </ListItemIcon>
                            <ListItemText primary={member.phone} />
                          </ListItem>
                        )}
                        {member.location && (
                          <ListItem>
                            <ListItemIcon>
                              <LocationCity />
                            </ListItemIcon>
                            <ListItemText primary={member.location} />
                          </ListItem>
                        )}
                        {member.occupation && (
                          <ListItem>
                            <ListItemIcon>
                              <Work />
                            </ListItemIcon>
                            <ListItemText primary={member.occupation} />
                          </ListItem>
                        )}
                      </List>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {member.bio}
                      </Typography>
                    </div>
                  </div>
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
