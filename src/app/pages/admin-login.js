import React, { useContext, useState } from "react";
import Router from "next/router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Email from "@material-ui/icons/Email";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { AuthContext } from "./_app";

const useStyles = makeStyles(styles);

function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const {
    error,
    isAuthenticated,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    setError,
    loading,
  } = useContext(AuthContext);

  const { ...rest } = props;

  React.useEffect(() => {
    if (isAuthenticated) {
      Router.push("/admin/dashboard");
    }
  }, [isAuthenticated]);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(img/central-mosque-1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h3>Login as Admin</h3>
                  </CardHeader>
                  <CardBody>
                    {loading && <p>logging in...</p>}
                    {error && (
                      <SnackbarContent
                        message={<span>ERROR: {error}</span>}
                        color="danger"
                      />
                    )}
                    {!isAuthenticated && (
                      <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "email",
                          name: "email",
                          value: values.email,
                          onChange: handleChange,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                    {!isAuthenticated && (
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "password",
                          name: "password",
                          value: values.password,
                          onChange: handleChange,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          autoComplete: "off",
                        }}
                      />
                    )}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    
                    {!isAuthenticated && (
                      <Button
                        onClick={() =>
                          signInWithEmailAndPassword(
                            values.email,
                            values.password
                          )
                        }
                        color="primary"
                      >
                        LOG IN
                      </Button>
                    )}
                    {error && (
                      <Button
                        color="transparent"
                        onClick={() => setError(null)}
                      >
                        Clear Error
                      </Button>
                    )}
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

export default LoginPage;
