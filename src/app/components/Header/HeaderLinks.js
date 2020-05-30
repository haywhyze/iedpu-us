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
          <span>
            <Button color="transparent" className={classes.navLink}>
              Home
            </Button>
          </span>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/events">
          <span>
            <Button color="transparent" className={classes.navLink}>
              Events
            </Button>
          </span>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/news">
          <span>
            <Button color="transparent" className={classes.navLink}>
              News
            </Button>
          </span>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/gallery">
          <span>
            <Button color="transparent" className={classes.navLink}>
              Gallery
            </Button>
          </span>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/executives">
          <span>
            <Button color="transparent" className={classes.navLink}>
              Executives
            </Button>
          </span>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/history">
          <span>
            <Button color="transparent" className={classes.navLink}>
              Historical Facts
            </Button>
          </span>
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
            <span>
              <Button color="transparent" round>
                {user.displayName}
              </Button>
            </span>
          ) : (
            <span>
              <Button color="primary" round>
                Join Us
              </Button>
            </span>
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
