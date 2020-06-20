import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Tooltip from '@material-ui/core/Tooltip';

import Header from 'components/Header/Header.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Parallax from 'components/Parallax/Parallax.js';
import Link from 'next/link';

import styles from 'assets/jss/material-kit-react/views/components.js';

// Sections for this page
import HomeSection from '../Sections/HomeSection';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function Index(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="IEDPU"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: 'white',
        }}
        {...rest}
      />

      <Parallax image="img/central-mosque-1.jpg">
        <div style={{ display: 'flex', justifyContent: 'center' }} className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Welcome to IEDPU</h1>
                <h3 className={classes.subtitle}>
                  Ilorin Emirate Descendants Progressive Union (IEDPU) is the
                  mother of all Unions and Associations in the Ilorin Emirate.
                  It is also the umbrella Union of all indigenes of Ilorin
                  Emirate both at home and abroad.
                </h3>
                <Link href="/login">
                  <span>
                    <Button color="primary" round>
                      Join Us
                    </Button>
                  </span>
                </Link>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <HomeSection />
        </div>
      </div>
      <div
        style={{
          position: 'fixed',
          zIndex: '5',
          top: '40%',
          right: '10px',
          background: 'white',
          boxShadow:
            '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
          borderRadius: '6px',
        }}
      >
        <List>
          <li>
            <Tooltip
              id="instagram-twitter"
              title="Follow us on twitter"
              placement={
                process.browser && window.innerWidth > 959 ? 'top' : 'left'
              }
            >
              <span>
                <Button
                  href="https://twitter.com/haywhyze"
                  target="_blank"
                  style={{
                    color: 'inherit',
                    position: 'relative',
                    padding: '0.9375rem',
                    fontWeight: '400',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    borderRadius: '3px',
                    lineHeight: '20px',
                    textDecoration: 'none',
                    margin: '0px',
                    display: 'inline-flex',
                    '&:hover,&:focus': {
                      color: 'inherit',
                      background: 'rgba(200, 200, 200, 0.2)',
                    },
                  }}
                  color="transparent"
                >
                  <i
                    style={{ position: 'relative' }}
                    className="fab fa-twitter"
                  />
                </Button>
              </span>
            </Tooltip>
          </li>
          <li>
            <Tooltip
              id="instagram-facebook"
              title="Follow us on facebook"
              placement={
                process.browser && window.innerWidth > 959 ? 'top' : 'left'
              }
            >
              <span>
                <Button
                  color="transparent"
                  href="https://www.facebook.com/haywhyze"
                  target="_blank"
                  style={{
                    color: 'inherit',
                    position: 'relative',
                    padding: '0.9375rem',
                    fontWeight: '400',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    borderRadius: '3px',
                    lineHeight: '20px',
                    textDecoration: 'none',
                    margin: '0px',
                    display: 'inline-flex',
                    '&:hover,&:focus': {
                      color: 'inherit',
                      background: 'rgba(200, 200, 200, 0.2)',
                    },
                  }}
                >
                  <i
                    style={{ fontSize: '20px !important' }}
                    className="fab fa-facebook"
                  />
                </Button>
              </span>
            </Tooltip>
          </li>
          <li>
            <Tooltip
              id="instagram-tooltip"
              title="Follow us on instagram"
              placement={
                process.browser && window.innerWidth > 959 ? 'top' : 'left'
              }
            >
              <span>
                <Button
                  color="transparent"
                  href="https://www.instagram.com/ilorinemirate_us"
                  target="_blank"
                  style={{
                    color: 'inherit',
                    position: 'relative',
                    padding: '0.9375rem',
                    fontWeight: '400',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    borderRadius: '3px',
                    lineHeight: '20px',
                    textDecoration: 'none',
                    margin: '0px',
                    display: 'inline-flex',
                    '&:hover,&:focus': {
                      color: 'inherit',
                      background: 'rgba(200, 200, 200, 0.2)',
                    },
                  }}
                >
                  <i
                    style={{ marginRight: '4px' }}
                    className="fab fa-instagram"
                  />
                </Button>
              </span>
            </Tooltip>
          </li>
        </List>
      </div>
      <Footer />
    </div>
  );
}
