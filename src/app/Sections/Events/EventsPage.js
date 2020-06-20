import React, { useState, useContext, useEffect } from 'react';
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthContext, db } from '../../pages/_app';
import SingleEvent from './SingleEvent';
import SingleMeeting from './SingleMeeting';

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

export default function EventsContainer() {
  const classes = useStyles();

  const [events, setEvents] = useState([]);
  const [meetings, setMeetings] = useState([]);

  const [loading, setLoading] = useState(true);

  const { user, isAuthenticated } = useContext(AuthContext);

  const eventsRef = user && db.collection('events');
  const meetingsRef = user && db.collection('meetings');

  useEffect(() => {
    let unsubscribeEvents; let
      unsubscribeMeetings;
    if (user) {
      unsubscribeEvents = eventsRef.onSnapshot(
        (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
          setLoading(false);
          setEvents(data);
        },
        (error) => {
          console.log('Not verified yet', error.message);
          setLoading(false);
          Router.push('/');
        },
      );
      unsubscribeMeetings = meetingsRef.onSnapshot(
        (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
          setLoading(false);
          setMeetings(data);
        },
        (error) => {
          console.log('Not verified yet', error.message);
          setLoading(false);
          Router.push('/');
        },
      );
    }
    return () => {
      if (typeof unsubscribeEvents === 'function' && unsubscribeMeetings === 'function') {
        unsubscribeEvents();
        unsubscribeMeetings();
      }
    };
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
  console.log([...events, ...meetings]);
  return (
    <>
      <GridContainer>
        <Card plain>
          <CardBody>
            <GridContainer>
              {
                [...events, ...meetings].sort((a, b) => Date.parse(a.time) - Date.parse(b.time)).map((event) => {
                  if (!event.title) {
                    return (
                      <SingleMeeting
                        meetingNotes={event.meetingNotes}
                        venue={event.venue}
                        time={event.time}
                        key={event.id}
                        id={event.id}
                      />
                    );
                  }
                  return (
                    <SingleEvent
                      image={event.imageUrl}
                      venue={event.venue}
                      description={event.description}
                      time={event.time}
                      title={event.title}
                      key={event.id}
                      id={event.id}
                    />
                  );
                })
              }
            </GridContainer>
          </CardBody>
        </Card>
      </GridContainer>
    </>
  );
}
