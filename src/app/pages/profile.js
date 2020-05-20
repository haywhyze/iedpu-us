import React, { useContext, useState } from "react";
import Router from "next/router";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import SectionTabs from "../Sections/SectionTabs";
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import Button from "components/CustomButtons/Button.js";
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
  const [photoURL, setPhotoURL] = useState((user && user.photoURL) || "");

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
        if (doc.exists) {
          setDisplayName(doc.data().displayName);
          setPhotoURL(doc.data().photoURL);
        }
      });

  React.useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/login");
    }
  }, [isAuthenticated]);

  React.useEffect(() => {
    Router.prefetch("/login");
  }, []);

  const changePhoto = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "haywhyze",
        uploadPreset: "ittv3vvm",
        sources: ["local", "camera", "facebook", "instagram"],
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#FFFFFF",
            windowBorder: "#90A0B3",
            tabIcon: "#0078FF",
            menuIcons: "#5A616A",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#0078FF",
            action: "#FF620C",
            inactiveTabIcon: "#0E2F5A",
            error: "#F44235",
            inProgress: "#0078FF",
            complete: "#20B832",
            sourceBg: "#E4EBF1",
          },
          fonts: {
            default: {
              active: true,
            },
          },
        },
      },
      (err, info) => {
        if (!err) {
          if (info.event === "success") {
            // console.log(info.info.secure_url)
            db.collection("Users")
              .doc(user.uid)
              .update({ photoURL: info.info.secure_url })
              .then(function () {
                console.log("Document successfully written!");
              })
              .catch(function (error) {
                console.error("Error writing document: ", error);
              });
            console.log("Upload Widget event - ", info);
          }
        }
      }
    );
  };

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
                      src={photoURL + "?height=400" || "img/profile.png"}
                      alt="..."
                      className={imageClasses}
                    />
                    <Button
                      onClick={changePhoto}
                      color="transparent"
                      style={{
                        padding: "0.2rem 0.9375rem",
                        fontWeight: "400",
                        fontSize: "12px",
                      }}
                    >
                      <AddAPhoto fontSize="small" />
                    </Button>
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
