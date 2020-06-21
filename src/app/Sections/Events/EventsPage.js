import React, { useState, useContext, useEffect } from 'react';
import Router from 'next/router';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthContext, db } from '../../pages/_app';
import SingleEvent from './SingleEvent';

export default function EventsContainer() {

  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const { user, isAuthenticated } = useContext(AuthContext);

  const eventsRef = user && db.collection('events');

  useEffect(() => {
    let unsubscribeEvents;
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
    }
    return () => {
      if (typeof unsubscribeEvents === 'function') {
        unsubscribeEvents();
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
  return (
    <>
      <GridContainer>
        <Card plain>
          <CardBody>
            <GridContainer>
              {
                events.sort((a, b) => Date.parse(a.time) - Date.parse(b.time)).map((event) => {
                  if (!event.title) {
                    return null;
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
