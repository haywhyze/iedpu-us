import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);

export default function DeleteCell() {
  const classes = useStyles();

  return (
    <>
      <Tooltip
        id="tooltip-top"
        title="Delete Member"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton aria-label="Delete" className={classes.tableActionButton}>
          <Delete
            className={classes.tableActionButtonIcon + " " + classes.edit}
          />
        </IconButton>
      </Tooltip>
    </>
  );
}
