/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter.js';
import Create from '@material-ui/icons/Create';
import LocationOn from '@material-ui/icons/LocationOn';
import LocationCity from '@material-ui/icons/LocationCity';
import ConfirmDelete from './ConfirmDelete';
import ViewEventModal from './ViewEventModal';
import EditEventModal from './EditEventModal';
const avatar = "/img/sidebar-2.jpg";

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

  const descriptionEl = useRef(null);

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
          <img className={classes.image} src={image || avatar} alt="..." />
        </CardHeader>
        <CardBody style={{
          height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}
        >
          <h3>{title}</h3>
          <p ref={descriptionEl} style={{ whiteSpace: 'pre-wrap', overflow: 'hidden' }}>
            {description}

          </p>
          <span>
            <Button
              onClick={() => viewEvent({
                time, description, venue, id, image: image || avatar,
              })}
              simple
              size="sm"
              color="info"
            >
              View Details
            </Button>
          </span>

          <h5>
            <LocationOn fontSize="small" />
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
