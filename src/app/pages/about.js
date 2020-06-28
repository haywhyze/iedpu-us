import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Parallax from 'components/Parallax/Parallax.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Small from 'components/Typography/Small.js';
import CustomTabs from 'components/CustomTabs/CustomTabs.js';
import Footer from 'components/Footer/Footer.js';

import styles from 'assets/jss/material-kit-react/views/profilePage.js';
import styles2 from 'assets/jss/material-kit-react/views/landingPage.js';
import typoStyles from 'assets/jss/material-kit-react/views/componentsSections/typographyStyle.js';
import teamStyles from 'assets/jss/material-kit-react/views/landingPageSections/teamStyle.js';

import organizationChartData from '../Sections/OrganizationCharts/data';
import Panel from '../Sections/OrganizationCharts/Panel';

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(styles2);
const useTypoStyles = makeStyles(typoStyles);
const useTeamStyles = makeStyles(teamStyles);

export default function Executives(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const typoClasses = useTypoStyles();
  const teamClasses = useTeamStyles();
  const { ...rest } = props;
  const { executives } = organizationChartData;
  return (
    <div>
      <Header
        color="transparent"
        routes={[]}
        brand="IEDPU - USA"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 50,
          color: 'white',
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
      <Parallax small image="img/central-mosque-1.jpg">
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem style={{ textAlign: 'center' }} xs={12} sm={12} md={10}>
              <div>
                <h1 className={classes.title} style={{ color: '#fff' }}>
                  About IEDPU - USA
                </h1>
                <h2>
                  <Small>
                    <span style={{ color: '#fff' }}>
                      Get to know about Ilorin Emirate Descendants Progressive Union in the USA and the amazing people behind it.
                    </span>
                  </Small>
                </h2>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes2.main, classes2.mainRaised)}>
        <div className={classes2.container}>
          <div style={{ textAlign: 'center' }} className={classes2.section}>
            <h2 className={teamClasses.title}>.</h2>
            <div>
              <div className={classes.container}>
                <div id="nav-tabs">
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomTabs
                        headerColor="primary"
                        tabs={[
                          {
                            tabName: 'About',
                            tabContent: (
                              <>
                                <h3>About IEDPU - USA</h3>
                              </>
                            ),
                          },
                          {
                            tabName: 'Executives',
                            tabContent: (
                              <>
                                <Panel data={executives} />
                              </>
                            ),
                          },
                          {
                            tabName: 'Board of Trustees',
                            tabContent: (
                              <>
                                <Panel data={executives} />
                              </>
                            ),
                          },
                          {
                            tabName: 'Advisory Council',
                            tabContent: (
                              <>
                                <Panel data={executives} />
                              </>
                            ),
                          },
                        ]}
                      />
                    </GridItem>
                  </GridContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
