import React, { useEffect, useState, useContext } from 'react';
import Router, { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
// core components
import Navbar from 'components/Navbars/Navbar.js';
import Footer from 'components/Footer/Footer.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import { BrowserRouter } from 'react-router-dom';
import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';
import { AuthContext, db } from '../_app';

import routes from '../../routes';

const bgImage = '../img/sidebar-2.jpg';
const logo = '../img/logo.png';

const useStyles = makeStyles(styles);

export default function ({ ...rest }) {
  const router = useRouter();
  const { section } = router.query;
  const {
    user, isAdmin, isAuthenticated, signOut,
  } = useContext(AuthContext);
  const docRef = user && db.collection('Users').orderBy('displayName');
  const eventsRef = user && db.collection('events');
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [currentSection, setCurrentSection] = useState(null);
  const [switchRoutes, setSwitchRoutes] = useState(null);
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    setSwitchRoutes(
      <>
        {routes.map((prop, key) => {
          if (prop.layout === '/admin' && prop.path === `/${section}`) {
            setCurrentSection(prop);
            return (
              <prop.component
                events={events}
                members={members}
                key={key + prop.path}
              />
            );
          }
        })}
      </>,
    );
  }, [router.query, currentSection, members]);

  useEffect(() => {
    if (user) {
      docRef.onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push({ ...doc.data(), id: doc.id });
        });
        setMembers(data);
      });
      eventsRef.onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push({ ...doc.data(), id: doc.id });
        });
        setEvents(data);
      });
    }
  }, [isAuthenticated, user]);

  React.useEffect(() => {
    if (!isAuthenticated) {
      Router.push('/admin-login');
    }
  }, [isAuthenticated]);

  React.useEffect(() => {
    Router.prefetch('/admin-login');
  }, []);

  if (!isAdmin) {
    Router.push('/admin-login');
    return null;
  }

  if (!process.browser) return null;
  if (!isAuthenticated) return null;
  return (
    <BrowserRouter>
      {isAuthenticated && isAdmin && (
        <div className={classes.wrapper}>
          <Sidebar
            routes={routes}
            logoText="IEDPU - USA"
            logo={logo}
            image={bgImage}
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            color="purple"
            {...rest}
          />
          <div className={classes.mainPanel} ref={mainPanel}>
            <Navbar
              routes={routes}
              route={currentSection}
              handleDrawerToggle={handleDrawerToggle}
              {...rest}
            />
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
            <Footer />
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}
