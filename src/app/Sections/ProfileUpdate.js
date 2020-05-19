import React, { useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
import Phone from "@material-ui/icons/Phone";
import Email from "@material-ui/icons/Email";
import Work from "@material-ui/icons/Work";
import Info from "@material-ui/icons/Info";
import LocationCity from "@material-ui/icons/LocationCity";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/profileStyle.js";
import { AuthContext } from "../pages/_app";
import { db } from "../pages/_app";

const useStyles = makeStyles(styles);

export default function ProfileUpdate() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [values, setValues] = useState({
    displayName: "",
    email: "",
    bio: "",
    phone: "",
    location: "",
    occupation: "",
  });

  const docRef = user && db.collection("Users").doc(user.uid);

  React.useEffect(() => {
    if (user)
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            const {
              displayName,
              email,
              bio,
              occupation,
              phone,
              location,
            } = doc.data();
            setValues({
              ...values,
              displayName,
              email,
              bio,
              occupation,
              phone,
              location,
            });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
  }, []);

  const _handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = () => {
    db.collection("Users")
      .doc(user.uid)
      .set(values)
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
                id="name"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                  name: "displayName",
                  value: values.displayName,
                  onChange: _handleChange,
                  endAdornment: (
                    <InputAdornment position="end">
                      <People className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <CustomInput
                labelText="Email"
                id="email"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                  name: "email",
                  disabled: true,
                  value: values.email,
                  onChange: _handleChange,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <CustomInput
                labelText="Phone Number"
                id="phone_number"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                  name: "phone",
                  value: values.phone,
                  onChange: _handleChange,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Phone className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <CustomInput
                labelText="Bio"
                id="bio"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: "bio",
                  type: "text",
                  value: values.bio,
                  onChange: _handleChange,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Info className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <CustomInput
                labelText="Location"
                id="location"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: "location",
                  type: "text",
                  value: values.location,
                  onChange: _handleChange,
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocationCity className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <CustomInput
                labelText="Occupation"
                id="occupation"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: "occupation",
                  type: "text",
                  value: values.occupation,
                  onChange: _handleChange,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Work className={classes.inputIconsColor} />
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
