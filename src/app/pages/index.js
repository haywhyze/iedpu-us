import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

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
import HomeSection from '../Sections/Homepage/HomeSection';
import SocialMediaButtons from '../Sections/utils/SocialMediaButtons';
import Donate from '../Sections/utils/Donate';

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
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: 'white',
        }}
        {...rest}
      />

      <Parallax image="img/central-mosque-1.jpg">
        <div
          style={{ display: 'flex', justifyContent: 'center' }}
          className={classes.container}
        >
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Welcome to IEDPU - USA</h1>
                <h3 className={classes.subtitle}>
                  Ilorin Emirate Descendants Progressive Union (IEDPU) is the
                  mother of all Unions and Associations in the Ilorin Emirate.
                  It is also the umbrella Union of all indigenes of Ilorin
                  Emirate both at home and abroad
                </h3>
                <Link href="#about">
                  <span>
                    <Button color="info" round>
                      Read More
                    </Button>
                  </span>
                </Link>
                <span style={{ marginLeft: '1rem' }}>
                  <Donate />
                </span>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div id="about" className={classes.container}>
          <HomeSection />
        </div>
      </div>
      <SocialMediaButtons />
      <Footer />
    </div>
  );
}
