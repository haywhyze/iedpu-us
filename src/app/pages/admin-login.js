import React, { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Email from '@material-ui/icons/Email';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import SnackbarContent from 'components/Snackbar/SnackbarContent.js';
import CardFooter from 'components/Card/CardFooter.js';

import styles from 'assets/jss/material-kit-react/views/loginPage.js';
import { AuthContext } from './_app';

const useStyles = makeStyles(styles);

function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  setTimeout(() => {
    setCardAnimation('');
  }, 700);
  const classes = useStyles();
  const {
    error,
    isAuthenticated,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    setError,
    loading,
    user,
    signOut,
    isAdmin,
  } = useContext(AuthContext);

  const { ...rest } = props;

  const [signIn, setSignIn] = useState(true);

  React.useEffect(() => {
    if (!isAdmin) {
      setSignIn(true);
    }
    if (isAuthenticated && user && isAdmin) {
      Router.push('/admin/dashboard');
    }
  }, [isAuthenticated, user, isAdmin]);

  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const signUp = () => {
    if (!values.email || !values.password) {
      setError('Email/Passwords cannot be empty');
      return;
    }
    if (values.password.length < 6) {
      setError('Password can not be less than 6 characters');
      return;
    }
    if (values.password !== values.confirmPassword) {
      setError("Passwords don't match");
      setValues({
        ...values,
        password: '',
        confirmPassword: '',
      });
      return;
    }
    createUserWithEmailAndPassword(values.email, values.password);
  };

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(img/central-mosque-1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={10} sm={10} md={7} lg={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h3>{signIn ? 'Login as Admin' : 'Sign up as admin'}</h3>
                  </CardHeader>
                  <CardBody>
                    {loading && <p>logging in...</p>}
                    {error && (
                      <SnackbarContent
                        message={(
                          <span>
                            ERROR:
                            {error}
                          </span>
                        )}
                        color="danger"
                      />
                    )}
                    {(!isAuthenticated || !isAdmin) && (
                      <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: 'email',
                          name: 'email',
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
                    {(!isAuthenticated || !isAdmin) && (
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: 'password',
                          name: 'password',
                          value: values.password,
                          onChange: handleChange,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          autoComplete: 'off',
                        }}
                      />
                    )}
                    {!isAuthenticated && !signIn && (
                      <CustomInput
                        labelText="Confirm Password"
                        id="conpass"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: 'password',
                          name: 'confirmPassword',
                          value: values.confirmPassword,
                          onChange: handleChange,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          autoComplete: 'off',
                        }}
                      />
                    )}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <GridContainer>
                      <GridItem xs={12}>
                        {(!isAuthenticated || !isAdmin) && (
                          <Button
                            onClick={
                              signIn
                                ? () => signInWithEmailAndPassword(
                                  values.email,
                                  values.password,
                                )
                                : () => signUp()
                            }
                            color="primary"
                          >
                            {signIn ? 'LOG IN' : 'Sign up'}
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
                      </GridItem>
                      <GridItem xs={12}>
                        {signIn ? (
                          <p>
                            First time here?
                            <Button
                              onClick={() => setSignIn(false)}
                              color="transparent"
                            >
                              Sign Up
                            </Button>
                            {' '}
                            instead
                          </p>
                        ) : (
                          <p>
                            Have an admin account?
                            <Button
                              onClick={() => setSignIn(true)}
                              color="transparent"
                            >
                              Log in
                            </Button>
                            {' '}
                            instead
                          </p>
                        )}
                      </GridItem>
                    </GridContainer>
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
