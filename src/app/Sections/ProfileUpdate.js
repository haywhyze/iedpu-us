import React, { useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/profileStyle.js";
import { AuthContext } from "../pages/_app";
import { db } from "../pages/_app";

const useStyles = makeStyles(styles);

const docRef = db.collection("Users").doc("SF");

docRef
  .get()
  .then(function (doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  })
  .catch(function (error) {
    console.log("Error getting document:", error);
  });

export default function SectionLogin() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");

  const docRef = user && db.collection("Users").doc(user.uid);

  React.useEffect(() => {
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setDisplayName(doc.data().displayName);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, []);

  const handleChange = (e) => {
    setDisplayName(e.target.value);
  };

  const updateProfile = () => {
    db.collection("Users")
      .doc(user.uid)
      .set({
        displayName,
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem
            style={{ paddingLeft: 0, paddingRight: 0 }}
            xs={12}
            sm={12}
            md={10}
          >
            <form className={classes.form}>
              <CustomInput
                labelText="Full Name"
                id="first"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                  value: displayName,
                  onChange: handleChange,
                  endAdornment: (
                    <InputAdornment position="end">
                      <People className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button onClick={updateProfile} simple color="primary" size="lg">
                Update Profile
              </Button>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
