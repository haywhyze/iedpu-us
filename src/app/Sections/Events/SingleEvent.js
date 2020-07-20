/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import LocationOn from '@material-ui/icons/LocationOn';
import CardFooter from 'components/Card/CardFooter.js';
import AddToCalendar from 'react-add-to-calendar';
import ViewEventModal from '../../views/EventsMeetings/ViewEventModal';

export default function SingleEvent({
  title,
  description,
  venue,
  time,
  past,
  id,
}) {
  const [classicModal, setClassicModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const viewEvent = (event) => {
    setSelectedEvent(event);
    setClassicModal(true);
  };

  return (
    <GridItem style={{ display: 'flex' }} xs={12} sm={6} md={4}>
      <ViewEventModal
        classicModal={classicModal}
        setClassicModal={setClassicModal}
        event={selectedEvent}
      />
      <Card>
        <CardHeader>
          <h4>{title}</h4>
        </CardHeader>
        <CardBody style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}
        >
          {venue && (
          <h5>
            <LocationOn fontSize="small" />
            {' '}
            {venue}
          </h5>
          )}
          <h5>
            {new Intl.DateTimeFormat('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }).format(new Date(time))}
          </h5>
        </CardBody>
        <CardFooter style={{ borderTop: '1px solid rgba(40,40,40, .05)', zIndex: 30 }}>
          <span>
            <Button
              onClick={() => viewEvent({
                time, title, description, venue, id,
              })}
              simple
              size="sm"
              color="info"
            >
              View Details
            </Button>
          </span>
          {!past && <AddToCalendar
            event={{
              title, description, location: venue, startTime: time,
            }}
            displayItemIcons={false}
          />}
        </CardFooter>
      </Card>
    </GridItem>
  );
}
