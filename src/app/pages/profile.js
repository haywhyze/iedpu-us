import React, { useContext, useState } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

import Header from "components/Header/Header.js";
const LoginPage = dynamic(() => import("./login"));
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import SectionTabs from "../Sections/SectionTabs";
import { db } from "./_app";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { AuthContext } from "./_app";

const useStyles = makeStyles(styles);

function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const { user, isAuthenticated } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(
    (user && user.displayName) || ""
  );

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: purple;
  `;

  user &&
    db
      .collection("Users")
      .doc(user.uid)
      .onSnapshot(function (doc) {
        if (doc.exists) setDisplayName(doc.data().displayName);
      });

  React.useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/login");
    }
  }, [isAuthenticated]);

  React.useEffect(() => {
    Router.prefetch("/login");
  }, []);

  if (!user)
    return <ClipLoader css={override} size={150} color={"#123abc"} loading />;

  return (
    <div>
      <Header
        color="transparent"
        brand="IEDPU"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small filter image="img/central-mosque-1.jpg" />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={(user && user.photoURL) || "img/profile.png"}
                      alt="..."
                      className={imageClasses}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{displayName}</h3>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <SectionTabs />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
