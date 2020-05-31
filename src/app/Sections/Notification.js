import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
import Info from "@material-ui/icons/InfoOutlined";
// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Clearfix from "components/Clearfix/Clearfix.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/notificationsStyles.js";

const useStyles = makeStyles(styles);

export default function Notifications({ type, message }) {
  const classes = useStyles();
  return (
    <div className={classes.section} id="notifications">
      <SnackbarContent
        message={<span>{message}</span>}
        // close
        color={type}
        icon={
          type !== "info"
            ? type !== "warning" 
            ? type !== "danger"
            ? Check 
              : Info
              : Warning
              : Info
        }
      />
      <Clearfix />
    </div>
  );
}
