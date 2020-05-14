import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Small from "components/Typography/Small.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import typoStyles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";

const useStyles = makeStyles(styles);
const useTypoStyles = makeStyles(typoStyles);

export default function Gallery(props) {
  const classes = useStyles();
  const typoClasses = useTypoStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={[]}
        brand="IEDPU"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 300,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small image="img/central-mosque-1.jpg">
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <div className={typoClasses.typo}>
                <h1 className={classes.title} style={{ color: "#fff" }}>
                  Gallery
                </h1>
                <h2>
                  <Small>
                    <span style={{ color: "#fff" }}>
                      Showcasing lovely photos of Ilorin, its people, culture and heritage
                    </span>
                  </Small>
                </h2>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
    </div>
  );
}
