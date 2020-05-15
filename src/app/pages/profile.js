import React, { useContext, useEffect } from "react";
import Router from "next/router";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import dynamic from "next/dynamic";
const LoginPage = dynamic(() => import("./login"));
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

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

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: purple;
  `;

  const { user, isAuthenticated } = useContext(AuthContext);

  React.useEffect(() => {
    if (isAuthenticated) return; // do nothing if the user is logged in
    Router.replace("/profile", "/login", { shallow: true });
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

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
                    <h3 className={classes.title}>
                      {user && user.displayName}
                    </h3>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
