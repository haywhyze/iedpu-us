/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "assets/jss/material-kit-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: true,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: true,
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem sm={6}>
            <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                <a href="#" className={aClasses}>
                  IEDPU - USA
                </a>
                <address>
                  Ilorin Emirate Descendants Progressive Union (IEDPU),
                  <br />
                  United States of America (USA) Branch Inc., <br />
                  P.O Box 979,
                  Yonkers NY 10704, <br />
                  New York, USA.
                </address>
              </ListItem>
            </List>
          </GridItem>
          <GridItem
            style={{
              display: "flex",
              textAlign: "right",
              flexDirection: "column",
            }}
            sm={6}
          >
            <a href="/privacy-policy" className={aClasses}>
              Privacy Policy
            </a>
            <div className="space" style={{ flex: "1 1 0%" }}></div>
            <div>
              +1(914)772-1407, (713)269-2027, (317)560-3493 <br />
              iedpu.usa@yahoo.com, ilorinemirate19@gmail.com <br />
              Follow us on{" "}
              <a href="https://twitter.com/Ilorin_US" className={aClasses}>
                Twitter
              </a>{" "}
              and{" "}
              <a
                href="https://www.instagram.com/ilorinemirate_us/"
                className={aClasses}
              >
                Instagram
              </a>
            </div>
            <p>
              &copy; {1900 + new Date().getYear()} , made with{" "}
              <Favorite className={classes.icon} /> by{" "}
              <a href="https://sitasysng.com/" className={aClasses}>
                Sitasys
              </a>{" "}
              for a better Ilorin community.
            </p>
          </GridItem>
        </GridContainer>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
