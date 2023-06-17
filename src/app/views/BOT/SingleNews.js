/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter.js';
import Create from '@material-ui/icons/Create';
import ConfirmDelete from './ConfirmDelete';
import EditNewsModal from './EditNewsModal';
import ViewNewsModal from './ViewNewsModal';

const styles = {
  image: {
    width: '100%',
    height: '20rem',
    objectFit: 'cover',
  },
  footerButton: {
    padding: '10px',
  },
};

const useStyles = makeStyles(styles);

export default function SingleNews({
  image,
  name,
  details,
  position,
  id,
  rank
}) {
  const classes = useStyles();

  const [classicModal, setClassicModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [editModal, setEditModal] = useState(false);

  const editNews = (news) => {
    setSelectedNews(news);
    setEditModal(true);
  };

  const viewNews = (news) => {
    setSelectedNews(news);
    setClassicModal(true);
  };

  return (
    <GridItem xs={12} sm={6} md={4} lg={3}>
      <ViewNewsModal
        classicModal={classicModal}
        setClassicModal={setClassicModal}
        news={selectedNews}
      />
      <EditNewsModal
        classicModal={editModal}
        setClassicModal={setEditModal}
        news={selectedNews}
      />
      <Card>
        <CardHeader>
          <img className={classes.image} src={image} alt="..." />
        </CardHeader>
        <CardBody
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '140px',
          }}
        >
          <div>
            <h6 style={{ marginTop: '0' }}>{name}</h6>
            <p>
              {position}
            </p>
          </div>
          <span>
            <Button
              onClick={() => viewNews({
                id,
                image,
                name,
                details,
                position,
              })}
              size="sm"
              color="info"
            >
              View Details
            </Button>
          </span>
        </CardBody>
        <CardFooter>
          <Button
            onClick={() => editNews({
              id,
              image,
              name,
              bio: details,
              position,
              rank,
            })}
            className={classes.footerButton}
            color="transparent"
            round
          >
            <Create />
          </Button>
          <ConfirmDelete id={id} />
        </CardFooter>
      </Card>
    </GridItem>
  );
}
