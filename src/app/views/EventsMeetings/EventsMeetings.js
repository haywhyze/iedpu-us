import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import Notifications from '../../Sections/Notification';
import { AuthContext, db } from '../../pages/_app';
import NewEventModal from './NewEventModal';
import NewMeetingModal from './NewMeetingModal';
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

export default function EventsMeetings() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [classicModal, setClassicModal] = React.useState(false);
  const [meetingsModal, setMeetingsModal] = React.useState(false);
  const { user, isAuthenticated } = useContext(AuthContext);
  const eventsRef = user && db.collection('events');
  const meetingsRef = user && db.collection('meetings');
  const [loading, setLoading] = useState(true);
  const [successNotification, setSuccessNotification] = useState(false);
  const [failureNotification, setFailureNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
    if (user) {
      eventsRef.onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          data.push({ ...doc.data(), id: doc.id });
        });
        setLoading(false);
        setEvents(data);
      });
      meetingsRef.onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          data.push({ ...doc.data(), id: doc.id });
        });
        setLoading(false);
        setMeetings(data);
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
      <GridContainer spacing={2}>
        <NewEventModal
          classicModal={classicModal}
          setClassicModal={setClassicModal}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
          setSuccessNotification={setSuccessNotification}
          setFailureNotification={setFailureNotification}
        />
        <NewMeetingModal
          classicModal={meetingsModal}
          setClassicModal={setMeetingsModal}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
          setSuccessNotification={setSuccessNotification}
          setFailureNotification={setFailureNotification}
        />
        <GridItem>
          <Button
            onClick={() => setClassicModal(true)}
            color="primary"
            size="lg"
          >
            Create New event
          </Button>
        </GridItem>
        <GridItem>
          <Button
            color="info"
            size="lg"
            onClick={() => setMeetingsModal(true)}
          >
            Create New meeting
          </Button>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <Card plain>
          <CardHeader color="primary" plain>
            <h4 className={classes.cardTitleWhite}>Events</h4>
            <p className={classes.cardCategoryWhite}>
              Manage all upcoming and past events
            </p>
          </CardHeader>
          <CardBody>
            <GridContainer space={8}>
              {successNotification && (
                <Notifications type="success" message={successMessage} />
              )}
              {failureNotification && (
                <Notifications type="danger" message={errorMessage} />
              )}
              {events.sort((a, b) => Date.parse(b.time) - Date.parse(a.time)).map((event) => (
                <SingleEvent
                  image={event.imageUrl}
                  title={event.title}
                  description={event.description}
                  venue={event.venue}
                  time={event.time}
                  key={event.id}
                  id={event.id}
                  setSuccessMessage={setSuccessMessage}
                  setErrorMessage={setErrorMessage}
                  setSuccessNotification={setSuccessNotification}
                  setFailureNotification={setFailureNotification}
                />
              ))}
            </GridContainer>
          </CardBody>
        </Card>
        <Card plain>
          <CardHeader color="info" plain>
            <h4 className={classes.cardTitleWhite}>Meetings</h4>
            <p className={classes.cardCategoryWhite}>
              Manage all upcoming and past meetings
            </p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              {successNotification && (
              <Notifications type="success" message={successMessage} />
              )}
              {failureNotification && (
                <Notifications type="danger" message={errorMessage} />
              )}
              {meetings.sort((a, b) => Date.parse(b.time) - Date.parse(a.time)).map((event) => (
                <SingleMeeting
                  meetingNotes={event.meetingNotes}
                  venue={event.venue}
                  time={event.time}
                  key={event.id}
                  id={event.id}
                  setSuccessMessage={setSuccessMessage}
                  setErrorMessage={setErrorMessage}
                  setSuccessNotification={setSuccessNotification}
                  setFailureNotification={setFailureNotification}
                />
              ))}
            </GridContainer>
          </CardBody>
        </Card>
      </GridContainer>
    </>
  );
}
