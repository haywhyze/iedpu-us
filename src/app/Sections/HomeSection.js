import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";

import Slider from "react-slick";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import CarouselSection from "./CarouselSection";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function HomeSection() {
  const classes = useStyles();
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    autoPlay: true,
  };
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>About IEDPU 🇺🇸</h2>
          <h5 className={classes.description}>
            Ilorin Emirate Descendants Progressive Union 🇺🇸 is a community base
            organization established to promote peaceful coexistence, unity and
            socio-economic development of Our Community “ILU ILORIN” comprising
            of Asa, Ilorin East, Ilorin South, Ilorin West and Moro Local
            Government Areas of Kwara State - Nigeria, to develop spirit of
            common interest and sacrifice towards collective participation in
            our community programs. To engage and mobilize resources for
            progressive development of all members and our community both home &
            abroad
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <CarouselSection />
      </div>
    </div>
  );
}
