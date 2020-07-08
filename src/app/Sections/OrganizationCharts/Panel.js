/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

import styles from 'assets/jss/material-kit-react/views/profilePage.js';
import teamStyles from 'assets/jss/material-kit-react/views/landingPageSections/teamStyle.js';


const team1 = '/img/faces/marc.jpg';

const useStyles = makeStyles(styles);
const useTeamStyles = makeStyles(teamStyles);

export default function Panel({ data }) {
  const classes = useStyles();
  const teamClasses = useTeamStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid,
  );
  return (
    <GridContainer justify="center">
      {data.map((e) => (
        <GridItem key={Date.now() + Math.random()} xs={12} sm={12} md={6}>
          <Card plain>
            <GridItem
              xs={12}
              sm={12}
              md={6}
              className={teamClasses.itemGrid}
              style={{ margin: 'auto' }}
            >
              <img src={e.image} alt="..." className={imageClasses} />
            </GridItem>
            <h3 className={teamClasses.cardTitle} style={{ textAlign: 'center' }}>
              {e.name}
              <br />
              <small className={teamClasses.smallTitle}>
                {e.position}
              </small>
            </h3>
            <CardBody>
              <p className={teamClasses.description} style={{ textAlign: 'center', fontSize: '120%' }}>{e.bio}</p>
            </CardBody>
            <CardFooter className={teamClasses.justifyCenter}>
              {e.socialmedia.twitter && (
              <Button
                href={`https://twitter.com/${e.socialmedia.twitter}`}
                justIcon
                target="_blank"
                color="transparent"
                className={teamClasses.margin5}
              >
                <i
                  className={`${teamClasses.socials} fab fa-twitter`}
                />
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
                <i
                  className={`${teamClasses.socials} fab fa-instagram`}
                />
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
                <i
                  className={`${teamClasses.socials} fab fa-facebook`}
                />
              </Button>
              )}
            </CardFooter>
          </Card>
        </GridItem>
      ))}
    </GridContainer>
  );
}
