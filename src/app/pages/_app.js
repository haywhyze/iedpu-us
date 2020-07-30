import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import { ToastContainer } from 'react-toastify';
import theme from '../components/theme';

import 'react-toastify/dist/ReactToastify.css';
import firebaseConfig from '../firebaseConfig';
import 'firebase/auth';
import 'firebase/firestore';

import 'react-quill/dist/quill.snow.css';
import 'assets/scss/material-kit-react.scss?v=1.8.0';
import 'assets/scss/style.scss';

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const firebaseAppAuth = firebaseApp.auth();

export const db = firebase.firestore();

const providers = {
  facebookProvider: new firebase.auth.FacebookAuthProvider(),
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export const AuthContext = React.createContext();
function MyApp(props) {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      // User is signed in.
      setIsAuthenticated(true);
      const idToken = await user.getIdTokenResult();
      if (idToken && idToken.claims && idToken.claims.admin) {
        setIsAdmin(true);
        setAuthLoading(false);
      } else {
        setIsAdmin(false);
        setAuthLoading(false);
      }
    } else {
      // No user is signed in.
      setIsAuthenticated(false);
      setAuthLoading(false);
    }
  });
  const { Component, pageProps } = props;
  const {
    user,
    signOut,
    signInWithFacebook,
    signInWithGoogle,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    loading,
    error,
    setError,
  } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>IEDPU - USA</title>
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
            signInWithEmailAndPassword,
            createUserWithEmailAndPassword,
            loading,
            isAuthenticated,
            error,
            setError,
            isAdmin,
            authLoading,
          }}
        >
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </AuthContext.Provider>
        <ToastContainer />
      </ThemeProvider>
    </>
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
