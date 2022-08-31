/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { atcb_action } from 'add-to-calendar-button';
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import LocationOn from '@material-ui/icons/LocationOn';
import CardFooter from 'components/Card/CardFooter';
import ViewEventModal from '../../views/EventsMeetings/ViewEventModal';
import 'add-to-calendar-button/assets/css/atcb.css';

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
    <GridItem xs={12} sm={6} md={4}>
      <ViewEventModal
        classicModal={classicModal}
        setClassicModal={setClassicModal}
        event={selectedEvent}
      />
      <Card>
        <CardHeader>
          <h4>{title}</h4>
        </CardHeader>
        <CardBody
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {venue && (
            <>
              <LocationOn fontSize="small" />
              <h5 dangerouslySetInnerHTML={{ __html: venue }} />
            </>
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
        <CardFooter
          style={{ borderTop: '1px solid rgba(40,40,40, .05)', zIndex: 30 }}
        >
          <span>
            <Button
              onClick={() => viewEvent({
                time,
                title,
                description,
                venue,
                id,
              })}
              simple
              size="sm"
              color="info"
            >
              View Details
            </Button>
          </span>
          {!past && (
            <Button
              simple
              color="info"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                atcb_action({
                  name: title,
                  startDate: time,
                  options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'Yahoo'],
                  iCalFileName: title,
                });
              }}
            >
              Add to calendar
            </Button>
          )}
        </CardFooter>
      </Card>
    </GridItem>
  );
}
