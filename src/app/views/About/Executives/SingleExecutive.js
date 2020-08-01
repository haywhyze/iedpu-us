/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Create from '@material-ui/icons/Create';

import GridItem from 'components/Grid/GridItem.js';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

import styles from 'assets/jss/material-kit-react/views/profilePage.js';
import teamStyles from 'assets/jss/material-kit-react/views/landingPageSections/teamStyle.js';
import ConfirmDelete from './ConfirmDelete';
import EditExecutiveModal from './EditExecutive';

const useStyles = makeStyles(styles);
const useTeamStyles = makeStyles(teamStyles);

export default function SingleExecutive({ e }) {
  const classes = useStyles();
  const teamClasses = useTeamStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid,
  );

  const [selectedExco, setSelectedExco] = useState(null);
  const [editModal, setEditModal] = useState(false);

  const editExecutive = (executive) => {
    setSelectedExco(executive);
    setEditModal(true);
  };
  return (
    <GridItem key={Date.now() + Math.random()} xs={10} sm={6} lg={4}>
      <EditExecutiveModal
        classicModal={editModal}
        setClassicModal={setEditModal}
        exco={selectedExco}
      />
      <Card plain>
        <GridItem
          xs={8}
          sm={6}
          className={teamClasses.itemGrid}
          style={{ margin: 'auto' }}
        >
          <img src={e.image} alt="..." className={imageClasses} />
        </GridItem>
        <h4 className={teamClasses.cardTitle} style={{ textAlign: 'center' }}>
          {e.name}
          <br />
          <small className={teamClasses.smallTitle}>{e.position}</small>
        </h4>
        <CardBody>
          <p
            className={teamClasses.description}
            style={{ textAlign: 'center', fontSize: '90%' }}
          >
            {e.bio}
          </p>
        </CardBody>
        {/* <CardFooter className={teamClasses.justifyCenter}>
          {e.socialmedia.twitter && (
            <Button
              href={`https://twitter.com/${e.socialmedia.twitter}`}
              justIcon
              target="_blank"
              color="transparent"
              className={teamClasses.margin5}
            >
              <i className={`${teamClasses.socials} fab fa-twitter`} />
            </Button>
          )}
          {e.socialmedia.instagram && (
            <Button
              href={`https://instagram.com/${e.socialmedia.instagram}`}
              target="_blank"
              justIcon
              color="transparent"
              className={teamClasses.margin5}
            >
              <i className={`${teamClasses.socials} fab fa-instagram`} />
            </Button>
          )}
          {e.socialmedia.facebook && (
            <Button
              href={`https://facebook.com/${e.socialmedia.facebook}`}
              justIcon
              target="_blank"
              color="transparent"
              className={teamClasses.margin5}
            >
              <i className={`${teamClasses.socials} fab fa-facebook`} />
            </Button>
          )}
          {e.socialmedia.linkedIn && (
            <Button
              href={`${e.socialmedia.linkedIn}`}
              justIcon
              target="_blank"
              color="transparent"
              className={teamClasses.margin5}
            >
              <i className={`${teamClasses.socials} fab fa-linkedin`} />
            </Button>
          )}
        </CardFooter> */}
        <CardFooter>
          <Tooltip
            id="tooltip-top"
            title="Edit Executive Member"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              onClick={() => editExecutive(e)}
              aria-label="Delete"
              className={classes.tableActionButton}
            >
              <Create />
            </IconButton>
          </Tooltip>
          <ConfirmDelete id={e.id} />
        </CardFooter>
      </Card>
    </GridItem>
  );
}
