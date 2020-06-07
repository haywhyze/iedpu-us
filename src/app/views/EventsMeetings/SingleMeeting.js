/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter.js';
import Create from '@material-ui/icons/Create';
import LocationCity from '@material-ui/icons/LocationCity';
import ConfirmMeetingDelete from './ConfirmMeetingDelete';
import EditMeetingModal from './EditMeetingModal';
import ViewMeetingModal from './ViewMeetingModal';

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

export default function SingleMeeting({
  meetingNotes,
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
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const viewMeeting = (meeting) => {
    setSelectedMeeting(meeting);
    setClassicModal(true);
  };

  const editMeeting = (meeting) => {
    setSelectedMeeting(meeting);
    setEditModal(true);
  };

  return (
    <GridItem xs={12} sm={6} md={4} lg={3}>
      <ViewMeetingModal
        classicModal={classicModal}
        setClassicModal={setClassicModal}
        meeting={selectedMeeting}
      />
      <EditMeetingModal
        classicModal={editModal}
        setClassicModal={setEditModal}
        meeting={selectedMeeting}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
        setSuccessNotification={setSuccessNotification}
        setFailureNotification={setFailureNotification}
      />
      <Card>
        <CardBody style={{
          height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}
        >
          <h4>
            {new Intl.DateTimeFormat('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }).format(new Date(time))}
          </h4>
          <p style={{ whiteSpace: 'pre-wrap', overflow: 'hidden' }}>
            {meetingNotes}


          </p>
          <span>
            <Button
              onClick={() => viewMeeting({
                time, meetingNotes, venue, id,
              })}
              simple
              size="sm"
              color="info"
            >
              View Details
            </Button>
          </span>
          <h5>
            <LocationCity fontSize="small" />
            {venue}
          </h5>
        </CardBody>
        <CardFooter style={{ borderTop: '1px solid rgba(40,40,40, .05)' }}>
          <Button
            onClick={() => editMeeting({
              time, meetingNotes, venue, id,
            })}
            className={classes.footerButton}
            color="transparent"
          >
            <Create />
          </Button>
          <ConfirmMeetingDelete
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
