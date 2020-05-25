/*eslint-disable*/
import React, { useContext } from "react";
// react components for routing our app without refresh
import Link from "next/link";
import { useRouter } from "next/router";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { AuthContext } from "../../pages/_app";

const useStyles = makeStyles(styles);

function HeaderLinks(props) {
  const classes = useStyles();
  const router = useRouter();
  const { user, signOut, isAuthenticated } = useContext(AuthContext);
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link href="/">
          <Button color="transparent" className={classes.navLink}>
            Home
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/events">
          <Button color="transparent" className={classes.navLink}>
            Events
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/news">
          <Button color="transparent" className={classes.navLink}>
            News
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/gallery">
          <Button color="transparent" className={classes.navLink}>
            Gallery
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/executives">
          <Button color="transparent" className={classes.navLink}>
            Executives
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/history">
          <Button color="transparent" className={classes.navLink}>
            Historical Facts
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link
          href={
            user
              ? router.pathname !== "/profile"
                ? "/profile"
                : "/login"
              : "/login"
          }
        >
          {user ? (
            <Button color="transparent" round>
              {user.displayName}
            </Button>
          ) : (
            <Button color="primary" round>
              Join Us
            </Button>
          )}
        </Link>
      </ListItem>
      {isAuthenticated && (
        <ListItem className={classes.listItem}>
          <Button color="danger" round onClick={signOut}>
            Sign out
          </Button>
        </ListItem>
      )}
    </List>
  );
}

export default HeaderLinks;
