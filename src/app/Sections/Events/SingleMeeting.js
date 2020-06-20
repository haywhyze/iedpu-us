/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import LocationOn from '@material-ui/icons/LocationOn';
import ViewMeetingModal from './ViewMeetingModal';

const avatar = '/img/meeting_4.jpg';

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
}) {
  const classes = useStyles();

  const [classicModal, setClassicModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const viewMeeting = (meeting) => {
    setSelectedMeeting(meeting);
    setClassicModal(true);
  };

  return (
    <GridItem xs={12} sm={6} md={4} lg={3}>
      <ViewMeetingModal
        classicModal={classicModal}
        setClassicModal={setClassicModal}
        meeting={selectedMeeting}
      />
      <Card>
        <CardHeader>
          <img style={{ objectFit: 'contain'}} className={classes.image} src={avatar} alt="..." />
        </CardHeader>
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
            <LocationOn fontSize="small" />
            {venue}
          </h5>
        </CardBody>
      </Card>
    </GridItem>
  );
}
