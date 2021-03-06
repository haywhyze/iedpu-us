import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import ViewNewsModal from './ViewNewsModal';

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
  id,
}) {
  const classes = useStyles();

  const descriptionEl = useRef(null);

  const [classicModal, setClassicModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const viewNews = (news) => {
    setSelectedNews(news);
    setClassicModal(true);
  };

  return (
    <GridItem xs={12} sm={6} md={4}>
      <ViewNewsModal
        classicModal={classicModal}
        setClassicModal={setClassicModal}
        news={selectedNews}
      />
      <Card>
        <CardHeader>
          <img className={classes.image} src={image} alt="..." />
        </CardHeader>
        <CardBody style={{
          height: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}
        >
          <h3 style={{ marginTop: '0' }}>{title}</h3>
          <p ref={descriptionEl} style={{ whiteSpace: 'pre-wrap', overflow: 'hidden' }}>{details}</p>
          <span>
            <Button
              onClick={() => viewNews({
                id, image, title, details, author, time, caption,
              })}
              simple
              size="sm"
              color="info"
            >
              View Details
            </Button>
          </span>
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
      </Card>
    </GridItem>
  );
}
