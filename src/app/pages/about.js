import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import teamStyles from 'assets/jss/material-kit-react/views/landingPageSections/teamStyle.js';
import { toast } from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';

import Panel from '../Sections/OrganizationCharts/Panel';
import { db } from './_app';

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(styles2);
const useTeamStyles = makeStyles(teamStyles);

export default function Executives(props) {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [allExcos, setAllExcos] = useState([]);

  const classes = useStyles();
  const classes2 = useStyles2();
  const teamClasses = useTeamStyles();
  const { ...rest } = props;

  const aboutRef = db.collection('about').doc('hFOSsA2VgSRQpVGjOPCW');
  const executivesRef = db.collection('executives');

  useEffect(() => {
    executivesRef
      .get()
      .then((doc) => {
        const data = [];
        doc.forEach((newDoc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push({ ...newDoc.data(), id: doc.id });
        });
        setAllExcos(data);
        // console.log(data);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(`Error fetching about us, ${error.message}`);
      });
  }, []);

  useEffect(() => {
    if (aboutRef) {
      aboutRef
        .get()
        .then((doc) => {
          setLoading(false);
          if (doc.exists) {
            setText(doc.data()['about-us']);
          } else {
            // doc.data() will be undefined in this case
            toast.error('Error fetching about us');
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error(`Error fetching about us, ${error.message}`);
        });
    }
  }, [aboutRef]);

  function createMarkup() {
    return { __html: text };
  }

  const excos = allExcos.filter((e) => e.type === 'executives');
  const bot = allExcos.filter((e) => e.type === 'BOT');
  const ac = allExcos.filter((e) => e.type === 'council');

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
                              <>
                                {loading ? (
                                  <div
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      minHeight: '40vh',
                                    }}
                                  >
                                    <CircularProgress />
                                  </div>
                                ) : (
                                  <div>
                                    <div
                                      className="about-us"
                                      dangerouslySetInnerHTML={createMarkup()}
                                    />
                                    <div>
                                      <a
                                        href="/iedpu-us_constitution.pdf"
                                        download
                                      >
                                        <span>
                                          <Button
                                            color="primary"
                                            size="lg"
                                            round
                                          >
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
                                )}
                              </>
                            ),
                          },
                          {
                            tabName: 'Executives',
                            tabContent: (
                              <>
                                {loading ? (
                                  <div
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      minHeight: '40vh',
                                    }}
                                  >
                                    <CircularProgress />
                                  </div>
                                ) : (
                                  <Panel data={excos} />)}
                              </>
                            ),
                          },
                          {
                            tabName: 'Board of Trustees',
                            tabContent: (
                              <>
                                {loading ? (
                                  <div
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      minHeight: '40vh',
                                    }}
                                  >
                                    <CircularProgress />
                                  </div>
                                ) : (
                                  <Panel data={bot} />)}
                              </>
                            ),
                          },
                          {
                            tabName: 'Advisory Council',
                            tabContent: (
                              <>
                                {loading ? (
                                  <div
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      minHeight: '40vh',
                                    }}
                                  >
                                    <CircularProgress />
                                  </div>
                                ) : (
                                  <Panel data={ac} />)}
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
