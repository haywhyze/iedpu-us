import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter.js';
import Create from '@material-ui/icons/Create';
import Delete from '@material-ui/icons/Delete';
import Launch from '@material-ui/icons/Launch';

const styles = {
  image: {
    width: '100%',
    height: '10rem',
    objectFit: 'cover',
  },
  footerButton: {
    padding: '10px',
  },
};

const useStyles = makeStyles(styles);

export default function SingleNews({
  image,
  title,
  details,
  author,
  time,
  caption,
}) {
  const classes = useStyles();
  return (
    <GridItem xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardHeader>
          <img className={classes.image} src={image} alt="..." />
          <p style={{ marginBottom: '0', marginTop: '10px' }}>{caption}</p>
        </CardHeader>
        <CardBody>
          <h3 style={{ marginTop: '0' }}>{title}</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{details}</p>
          <h5>
            By
            {' '}
            {author}
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
        <CardFooter>
          <Button className={classes.footerButton} color="transparent" round>
            <Create />
          </Button>
          <Button className={classes.footerButton} color="transparent" round>
            <Launch />
          </Button>
          <Button className={classes.footerButton} color="transparent" round>
            <Delete />
          </Button>
        </CardFooter>
      </Card>
    </GridItem>
  );
}
