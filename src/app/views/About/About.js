import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CustomTabs from 'components/CustomTabs/CustomTabs.js';
import CircularProgress from '@material-ui/core/CircularProgress';

import AboutUs from './AboutUs';
import { AuthContext, db } from '../../pages/_app';


const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);

export default function EventsMeetings() {
  const classes = useStyles();

  const [news, setNews] = useState([]);
  const [classicModal, setClassicModal] = React.useState(false);
  const [loading, setLoading] = useState(true);

  const { user, isAuthenticated } = useContext(AuthContext);

  const newsRef = user && db.collection('news');

  useEffect(() => {
    if (user) {
      newsRef.onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setLoading(false);
        setNews(data);
      });
    }
  }, [isAuthenticated, user]);

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
    <>
      <GridContainer>
        {/* <Card plain>
          <CardHeader color="primary" plain>
            <p className={classes.cardCategoryWhite}>
              Manage all news and feature articles
            </p>
          </CardHeader>
          <CardBody>
            <GridItem>
              <Button color="primary" size="lg" onClick={() => setClassicModal(true)}>
                Create New Post
              </Button>
            </GridItem>

          </CardBody>
        </Card> */}
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: 'About',
                tabContent: (
                  <>
                    <AboutUs />
                  </>
                ),
              },
              {
                tabName: 'Executives',
                tabContent: (
                  <>
                    {/* <Executives members={members} /> */}
                  </>
                ),
              },
              {
                tabName: 'Board of Trustees',
                tabContent: (
                  <>
                    {/* <BOT /> */}
                  </>
                ),
              },
              {
                tabName: 'Advisory Council',
                tabContent: (
                  <>
                    {/* <AdCouncil /> */}
                  </>
                ),
              },
              // {
              //   tabName: 'Defaulters',
              //   tabContent: (
              //     <>
              //       <h3>Defaulters</h3>
              //     </>
              //   ),
              // },
            ]}
          />
        </GridItem>
      </GridContainer>
    </>
  );
}
