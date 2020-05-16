import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../components/theme";

import firebaseConfig from "../firebaseConfig";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const firebaseAppAuth = firebaseApp.auth();

let isAuthenticated = false;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    isAuthenticated = true;
  } else {
    // No user is signed in.
    isAuthenticated = false;
  }
});

const providers = {
  facebookProvider: new firebase.auth.FacebookAuthProvider(),
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

import "assets/scss/material-kit-react.scss?v=1.8.0";

export const AuthContext = React.createContext();
function MyApp(props) {
  const { Component, pageProps } = props;
  const {
    user,
    signOut,
    signInWithFacebook,
    signInWithGoogle,
    loading,
    error
  } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>IEDPU - US</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider
          value={{
            user,
            signOut,
            signInWithFacebook,
            signInWithGoogle,
            loading,
            isAuthenticated,
            error
          }}
        >
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </AuthContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(MyApp);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
