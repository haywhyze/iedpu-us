import React, { useState, useContext, useRef } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import People from "@material-ui/icons/People";
import Phone from "@material-ui/icons/Phone";
import Email from "@material-ui/icons/Email";
import Work from "@material-ui/icons/Work";
import Info from "@material-ui/icons/Info";
import LocationCity from "@material-ui/icons/LocationCity";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { toast } from "react-toastify";

import styles from "assets/jss/material-kit-react/views/componentsSections/profileStyle.js";
import { AuthContext, db } from "../../pages/_app";

const useStyles = makeStyles(styles);

export default function ProfileUpdate() {
  const classes = useStyles();
  const notifySuccess = () => toast.success("Profile Updated Successfully");
  const notifyFailure = (error) =>
    toast.error(`Profile Update Failed, ${error}`);
  const { user } = useContext(AuthContext);
  const [values, setValues] = useState({
    displayName: "",
    email: "",
    bio: "",
    phone: "",
    location: "",
    occupation: "",
    family_house_lga: "",
  });
  const [locationValue, setLocationValue] = useState(values.location);
  const formRef = useRef(null);

  const docRef = user && db.collection("Users").doc(user.uid);

  React.useEffect(() => {
    if (user) {
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const {
              displayName,
              email,
              bio,
              occupation,
              phone,
              location,
              family_house_lga,
              address,
            } = doc.data();
            setValues({
              ...values,
              displayName: displayName || "",
              email: email || "",
              bio: bio || "",
              occupation: occupation || "",
              phone: phone || "",
              location: location || "",
              address: address || "",
              family_house_lga: family_house_lga || "",
            });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          notifyFailure(error);
        });
    }
  }, []);

  const handleChange = (e) => {
    if (!e.target.name) {
      // console.log(e.target.textContent);
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    }
  };

  const updateProfile = () => {
    db.collection("Users")
      .doc(user.uid)
      .update(values)
      .then(() => {
        notifySuccess();
      })
      .catch((error) => {
        notifyFailure(error.message);
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
            <h2>Update Profile</h2>
            <ValidatorForm
              ref={formRef}
              onSubmit={updateProfile}
              onError={(errors) => console.log(errors)}
              className={classes.form}
            >
              <TextValidator
                label="Full Name"
                id="name"
                fullWidth
                onChange={handleChange}
                type="text"
                style={{
                  margin: "0 0 17px 0",
                  paddingTop: "27px",
                  position: "relative",
                }}
                name="displayName"
                validators={[
                  "required",
                  "minStringLength:3",
                  "maxStringLength:70",
                  "matchRegexp:^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$",
                ]}
                errorMessages={[
                  "Fullname is required",
                  "Full Name cannot be less than 3 characters",
                  "Full Name cannot be more than 70 characters",
                  "Full name cannot end with a space character and should not be more than three names",
                ]}
                value={values.displayName}
                InputProps={{
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
                  onChange: handleChange,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextValidator
                label="Phone Number"
                id="phone_number"
                fullWidth
                type="phone"
                name="phone"
                style={{
                  margin: "0 0 17px 0",
                  paddingTop: "27px",
                  position: "relative",
                }}
                value={values.phone || ""}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Phone className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextValidator
                label="Bio - A little about yourself"
                style={{
                  margin: "0 0 17px 0",
                  paddingTop: "27px",
                  position: "relative",
                }}
                id="bio"
                fullWidth
                type="text"
                name="bio"
                validators={["maxStringLength:560"]}
                errorMessages={["Bio cannot be more than 560 characters"]}
                value={values.bio || ""}
                onChange={handleChange}
                InputProps={{
                  multiline: true,
                  rows: 4,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Info className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <Autocomplete
                options={[
                  "",
                  "Alabama",
                  "Alaska",
                  "American Samoa",
                  "Arizona",
                  "Arkansas",
                  "California",
                  "Colorado",
                  "Connecticut",
                  "Delaware",
                  "District of Columbia",
                  "Federated States of Micronesia",
                  "Florida",
                  "Georgia",
                  "Guam",
                  "Hawaii",
                  "Idaho",
                  "Illinois",
                  "Indiana",
                  "Iowa",
                  "Kansas",
                  "Kentucky",
                  "Louisiana",
                  "Maine",
                  "Marshall Islands",
                  "Maryland",
                  "Massachusetts",
                  "Michigan",
                  "Minnesota",
                  "Mississippi",
                  "Missouri",
                  "Montana",
                  "Nebraska",
                  "Nevada",
                  "New Hampshire",
                  "New Jersey",
                  "New Mexico",
                  "New York",
                  "North Carolina",
                  "North Dakota",
                  "Northern Mariana Islands",
                  "Ohio",
                  "Oklahoma",
                  "Oregon",
                  "Palau",
                  "Pennsylvania",
                  "Puerto Rico",
                  "Rhode Island",
                  "South Carolina",
                  "South Dakota",
                  "Tennessee",
                  "Texas",
                  "Utah",
                  "Vermont",
                  "Virgin Island",
                  "Virginia",
                  "Washington",
                  "West Virginia",
                  "Wisconsin",
                  "Wyoming",
                ]}
                fullWidth
                value={locationValue}
                onChange={(event, newValue) => {
                  setLocationValue(newValue);
                }}
                inputValue={values.location}
                onInputChange={(event, newInputValue) => {
                  setValues({ ...values, location: newInputValue });
                }}
                id="location"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="location"
                    label="State of Residence (USA)"
                  />
                )}
                getOptionLabel={(option) => option}
                style={{
                  margin: "0 0 17px 0",
                  paddingTop: "27px",
                  position: "relative",
                }}
              />
              <TextValidator
                label="USA Address"
                id="address"
                style={{
                  margin: "0 0 17px 0",
                  paddingTop: "27px",
                  position: "relative",
                }}
                fullWidth
                value={values.address || ""}
                name="address"
                onChange={handleChange}
                validators={["maxStringLength:70"]}
                errorMessages={["This field cannot be more than 70 characters"]}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocationCity className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextValidator
                label="Family House and LGA (Ilorin)"
                id="family_house_lga"
                style={{
                  margin: "0 0 17px 0",
                  paddingTop: "27px",
                  position: "relative",
                }}
                fullWidth
                value={values.family_house_lga || ""}
                name="family_house_lga"
                onChange={handleChange}
                validators={["maxStringLength:70"]}
                errorMessages={["This field cannot be more than 70 characters"]}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocationCity className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextValidator
                label="Occupation"
                id="occupation"
                fullWidth
                value={values.occupation}
                onChange={handleChange}
                name="occupation"
                validators={["maxStringLength:70"]}
                style={{
                  margin: "0 0 17px 0",
                  paddingTop: "27px",
                  position: "relative",
                }}
                errorMessages={["This field cannot be more than 70 characters"]}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Work className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button type="submit" round color="primary">
                Update Profile
              </Button>
            </ValidatorForm>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
