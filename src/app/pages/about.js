import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';

import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Parallax from 'components/Parallax/Parallax.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Small from 'components/Typography/Small.js';
import CustomTabs from 'components/CustomTabs/CustomTabs.js';
import Footer from 'components/Footer/Footer.js';

import styles from 'assets/jss/material-kit-react/views/profilePage.js';
import styles2 from 'assets/jss/material-kit-react/views/landingPage.js';
import typoStyles from 'assets/jss/material-kit-react/views/componentsSections/typographyStyle.js';
import teamStyles from 'assets/jss/material-kit-react/views/landingPageSections/teamStyle.js';

import { Typography } from '@material-ui/core';
import organizationChartData from '../Sections/OrganizationCharts/data';
import Panel from '../Sections/OrganizationCharts/Panel';
import { db } from './_app';

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(styles2);
const useTypoStyles = makeStyles(typoStyles);
const useTeamStyles = makeStyles(teamStyles);

export default function Executives(props) {
  const executivesRef = db.collection('executives');
  const [excos, setExcos] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const classes2 = useStyles2();
  const teamClasses = useTeamStyles();
  const { ...rest } = props;
  const { executives: pastExcos } = organizationChartData;
  const executives = excos.filter((ex) => ex.type === 'executives');
  const bot = excos.filter((ex) => ex.type === 'BOT');
  const ac = excos.filter((ex) => ex.type === 'council');

  useEffect(() => {
    setLoading(true);
    const unsubscribeEvents = executivesRef.onSnapshot(
      (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setLoading(false);
        setExcos(data);
      },
      (error) => {
        console.log('Not verified yet', error.message);
        setLoading(false);
      },
    );

    return () => {
      if (typeof unsubscribeEvents === 'function') {
        unsubscribeEvents();
      }
    };
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100%',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Header
        color="transparent"
        routes={[]}
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
                      Get to know about Ilorin Emirate Descendants Progressive
                      Union in the USA and the amazing people behind it.
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
                              <div
                                style={{
                                  textAlign: 'center',
                                  margin: '.5rem',
                                  lineHeight: 1.5,
                                  fontSize: '120%',
                                }}
                              >
                                <h3
                                  style={{ fontSize: '150%', lineHeight: 1.5 }}
                                >
                                  About IEDPU - USA
                                </h3>
                                <Typography
                                  variant="body1"
                                  style={{
                                    textAlign: 'justify',
                                    fontSize: '100%',
                                    lineHeight: 1.5,
                                  }}
                                  gutterBottom
                                >
                                  We, the indigenes of ILORIN EMIRATE from Kwara
                                  State of Nigeria residing in United States
                                  (North-America) have come together to find
                                  ways and means of improving ourselves in
                                  DIASPORA, and contributing to the development
                                  of our dearly beloved Emirate, thus providing
                                  economic activities that will have greater
                                  impact on our indigenes both in the United
                                  States and at home.
                                </Typography>
                                <br />
                                <Typography
                                  variant="body1"
                                  style={{
                                    textAlign: 'justify',
                                    fontSize: '100%',
                                    lineHeight: 1.5,
                                  }}
                                  gutterBottom
                                >
                                  ILORIN EMIRATE DESCENDANTS PROGRESSIVE UNION,
                                  United States (North-America) is a non-profit
                                  organization organized for educational, Social
                                  and charitable purposes within the meaning of
                                  Section 501(c) 3 of the Internal Revenue Code
                                  of the United States of America.
                                </Typography>
                                <br />
                                <Typography
                                  variant="body1"
                                  style={{
                                    textAlign: 'justify',
                                    fontSize: '100%',
                                    lineHeight: 1.5,
                                  }}
                                  gutterBottom
                                >
                                  The union was founded to promote and foster
                                  unity amongst Ilorin Emirate indigenes in
                                  United States (North-America). IEDPU-USA is to
                                  promote the cultural heritage of Ilorin
                                  Emirate, foster economic growth, initiate and
                                  encourage programs/projects that will have
                                  impact on the lives of our kinsmen living in
                                  the United States and at home.
                                </Typography>
                                <br />
                                <div>
                                  <a href="/iedpu-us_constitution.pdf" download>
                                    <span>
                                      <Button color="primary" size="lg" round>
                                        Download Constitution
                                      </Button>
                                    </span>
                                  </a>
                                  <a href="/iedpu-us_constitution.pdf">
                                    <span>
                                      <Button
                                        color="transparent"
                                        size="lg"
                                        round
                                      >
                                        Read Constitution
                                      </Button>
                                    </span>
                                  </a>
                                </div>
                              </div>
                            ),
                          },
                          {
                            tabName: 'Executives',
                            tabContent: (
                              <>
                                <Panel data={executives.sort((a, b) => a.rank - b.rank)} />
                              </>
                            ),
                          },
                          {
                            tabName: 'Board of Trustees',
                            tabContent: (
                              <>
                                <Panel data={bot.sort((a, b) => a.rank - b.rank)} />
                              </>
                            ),
                          },
                          {
                            tabName: 'Advisory Council',
                            tabContent: (
                              <>
                                <Panel data={ac.sort((a, b) => a.rank - b.rank)} />
                              </>
                            ),
                          },
                          {
                            tabName: 'Past Executives',
                            tabContent: (
                              <>
                                <Panel data={pastExcos} />
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
