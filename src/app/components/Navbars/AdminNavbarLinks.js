import React, { useContext } from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Hidden from "@material-ui/core/Hidden";

// @material-ui/icons
import ExitToApp from "@material-ui/icons/ExitToApp";
// core components
import Button from "components/CustomButtons/Button.js";
import { AuthContext } from "../../pages/_app";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const { signOut } = useContext(AuthContext);
  return (
    <div>
      <div className={classes.manager}>
        <Button
          color={
            process.browser && window.innerWidth > 959 ? "danger" : "danger"
          }
          justIcon={process.browser && window.innerWidth > 959}
          simple={!(process.browser && window.innerWidth > 959)}
          aria-haspopup="true"
          onClick={signOut}
          className={classes.buttonLink}
        >
          <ExitToApp className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Sign out</p>
          </Hidden>
        </Button>
      </div>
    </div>
  );
}
