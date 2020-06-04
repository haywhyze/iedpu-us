import React from 'react';
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

  return (
    <GridItem xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardHeader>
          <img className={classes.image} src={image} alt="..." />
        </CardHeader>
        <CardBody style={{ height: '250px' }}>
          <h3>{title}</h3>
          <p>
            {description.substring(0, 150)}
            {' '}
            <span>
              <Button simple size="sm" color="transparent">
                View Details
              </Button>
            </span>
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
          <Button className={classes.footerButton} color="transparent" round>
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
