/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter.js';
import Create from '@material-ui/icons/Create';
import LocationOn from '@material-ui/icons/LocationOn';
import ConfirmDelete from './ConfirmDelete';
import ViewEventModal from './ViewEventModal';
import EditEventModal from './EditEventModal';

const styles = {
  footerButton: {
    padding: '10px',
  },
};

const useStyles = makeStyles(styles);

export default function SingleEvent({
  title,
  description,
  venue,
  time,
  id,
}) {
  const classes = useStyles();

  const [classicModal, setClassicModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const viewEvent = (event) => {
    setSelectedEvent(event);
    setClassicModal(true);
  };

  const editEvent = (event) => {
    setSelectedEvent(event);
    setEditModal(true);
  };

  return (
    <GridItem xs={12} sm={6} md={4} lg={3}>
      <ViewEventModal
        classicModal={classicModal}
        setClassicModal={setClassicModal}
        event={selectedEvent}
      />
      <EditEventModal
        classicModal={editModal}
        setClassicModal={setEditModal}
        event={selectedEvent}
      />
      <Card>
        <CardHeader>
          <h4>{title}</h4>
        </CardHeader>
        <CardBody style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
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
        <CardFooter style={{ borderTop: '1px solid rgba(40,40,40, .05)' }}>
          <Button
            onClick={() => editEvent({
              title, description, venue, time, id,
            })}
            className={classes.footerButton}
            color="transparent"
            round
          >
            <Create />
          </Button>
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
          <ConfirmDelete
            id={id}
          />
        </CardFooter>
      </Card>
    </GridItem>
  );
}
