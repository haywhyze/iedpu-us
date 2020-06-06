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
import LocationCity from '@material-ui/icons/LocationCity';
import ConfirmDelete from './ConfirmDelete';
import ViewEventModal from './ViewEventModal';
import EditEventModal from './EditEventModal';

const styles = {
  image: {
    width: '100%',
    height: '10rem',
    objectFit: 'cover',
    borderRadius: 'calc(.25rem - 1px)',
  },
  footerButton: {
    padding: '10px',
  },
};

const useStyles = makeStyles(styles);

export default function SingleEvent({
  image,
  title,
  description,
  venue,
  time,
  id,
  setSuccessMessage,
  setErrorMessage,
  setSuccessNotification,
  setFailureNotification,
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
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
        setSuccessNotification={setSuccessNotification}
        setFailureNotification={setFailureNotification}
      />
      <Card>
        <CardHeader>
          <img className={classes.image} src={image} alt="..." />
        </CardHeader>
        <CardBody style={{
          height: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}
        >
          <h3>{title}</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            {description.substring(0, 200)}
            {description.length > 200 && (
            <span>
              ...
              <Button
                onClick={() => viewEvent({
                  time, description, venue, id,
                })}
                simple
                size="sm"
                color="info"
              >
                View Details
              </Button>
            </span>
            )}
          </p>
          <h5>
            <LocationCity fontSize="small" />
            {' '}
            {venue}
          </h5>
          <h6>
            {new Intl.DateTimeFormat('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }).format(new Date(time))}
          </h6>
        </CardBody>
        <CardFooter style={{ borderTop: '1px solid rgba(40,40,40, .05)' }}>
          <Button
            onClick={() => editEvent({
              title, description, venue, time, image, id,
            })}
            className={classes.footerButton}
            color="transparent"
            round
          >
            <Create />
          </Button>
          <ConfirmDelete
            id={id}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
            setSuccessNotification={setSuccessNotification}
            setFailureNotification={setFailureNotification}
          />
        </CardFooter>
      </Card>
    </GridItem>
  );
}
