import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Confirm from "@material-ui/icons/Check";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);

export default function ConfirmCell() {
  const classes = useStyles();

  return (
    <>
      <Tooltip
        id="tooltip-top"
        title="Confirm Member"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton aria-label="Confirm" className={classes.tableActionButton}>
          <Confirm
            className={classes.tableActionButtonIcon + " " + classes.edit}
          />
        </IconButton>
      </Tooltip>
    </>
  );
}
