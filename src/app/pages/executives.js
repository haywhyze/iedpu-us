import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Parallax from 'components/Parallax/Parallax.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Small from 'components/Typography/Small.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

import styles from 'assets/jss/material-kit-react/views/profilePage.js';
import styles2 from 'assets/jss/material-kit-react/views/landingPage.js';
import typoStyles from 'assets/jss/material-kit-react/views/componentsSections/typographyStyle.js';
import teamStyles from 'assets/jss/material-kit-react/views/landingPageSections/teamStyle.js';

const team1 = '/img/faces/marc.jpg';

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(styles2);
const useTypoStyles = makeStyles(typoStyles);
const useTeamStyles = makeStyles(teamStyles);

export default function Executives(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const typoClasses = useTypoStyles();
  const teamClasses = useTeamStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid,
  );
  const { ...rest } = props;
  const executives = [
    {
      name: 'Yusuf Ayo',
      position: 'Chairman',
      image: '/img/faces/marc',
      bio:
        'You can write here details about one of your team members. You can give more details about what they do. Feel free to add some links for people to be able to follow them outside the site.',
      socialmedia: {
        facebook: 'haywhyze',
        twitter: 'haywhyze',
        instagram: 'haywhyze',
      },
    },
    {
      name: 'Yusuf Ayo',
      position: 'Chairman',
      image: '/img/faces/marc',
      bio:
        'You can write here details about one of your team members. You can give more details about what they do. Feel free to add some links for people to be able to follow them outside the site.',
      socialmedia: {
        facebook: 'haywhyze',
        twitter: 'haywhyze',
        instagram: 'haywhyze',
      },
    },
    {
      name: 'Yusuf Ayo',
      position: 'Chairman',
      image: '/img/faces/marc',
      bio:
        'You can write here details about one of your team members. You can give more details about what they do. Feel free to add some links for people to be able to follow them outside the site.',
      socialmedia: {
        facebook: 'haywhyze',
        twitter: 'haywhyze',
        instagram: 'haywhyze',
      },
    },
    {
      name: 'Yusuf Ayo',
      position: 'Chairman',
      image: '/img/faces/marc',
      bio:
        'You can write here details about one of your team members. You can give more details about what they do. Feel free to add some links for people to be able to follow them outside the site.',
      socialmedia: {
        facebook: 'haywhyze',
        twitter: 'haywhyze',
        instagram: 'haywhyze',
      },
    },
    {
      name: 'Yusuf Ayo',
      position: 'Chairman',
      image: '/img/faces/marc',
      bio:
        'You can write here details about one of your team members. You can give more details about what they do. Feel free to add some links for people to be able to follow them outside the site.',
      socialmedia: {
        facebook: 'haywhyze',
        twitter: 'haywhyze',
        instagram: 'haywhyze',
      },
    },
    {
      name: 'Yusuf Ayo',
      position: 'Chairman',
      image: '/img/faces/marc',
      bio:
        'You can write here details about one of your team members. You can give more details about what they do. Feel free to add some links for people to be able to follow them outside the site.',
      socialmedia: {
        facebook: 'haywhyze',
        twitter: 'haywhyze',
        instagram: 'haywhyze',
      },
    },
  ];
  return (
    <div>
      <Header
        color="transparent"
        routes={[]}
        brand="IEDPU"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 50,
          color: 'white',
        }}
        {...rest}
      />
      <Parallax small image="img/central-mosque-1.jpg">
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <div className={typoClasses.typo}>
                <h1 className={classes.title} style={{ color: '#fff' }}>
                  Executives
                </h1>
                <h2>
                  <Small>
                    <span style={{ color: '#fff' }}>
                      Get to know the executive members of the union
                    </span>
                  </Small>
                </h2>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes2.main, classes2.mainRaised)}>
        <div className={classes2.container}>
          <div className={classes2.section}>
            <h2 className={teamClasses.title}>Here is our team</h2>
            <div>
              <GridContainer>
                {executives.map((e) => (
                  <GridItem xs={12} sm={12} md={4}>
                    <Card plain>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        className={teamClasses.itemGrid}
                      >
                        <img src={team1} alt="..." className={imageClasses} />
                      </GridItem>
                      <h4 className={teamClasses.cardTitle}>
                        {e.name}
                        <br />
                        <small className={teamClasses.smallTitle}>
                          {e.position}
                        </small>
                      </h4>
                      <CardBody>
                        <p className={teamClasses.description}>{e.bio}</p>
                      </CardBody>
                      <CardFooter className={teamClasses.justifyCenter}>
                        {e.socialmedia.twitter && (
                        <Button
                          href={`https://twitter.com/${e.socialmedia.twitter}`}
                          justIcon
                          color="transparent"
                          className={teamClasses.margin5}
                        >
                          <i
                            className={`${teamClasses.socials} fab fa-twitter`}
                          />
                        </Button>
                        )}
                        {e.socialmedia.twitter && (
                        <Button
                          href={`https://instagram.com/${e.socialmedia.instagram}`}
                          justIcon
                          color="transparent"
                          className={teamClasses.margin5}
                        >
                          <i
                            className={`${teamClasses.socials} fab fa-instagram`}
                          />
                        </Button>
                        )}
                        {e.socialmedia.twitter && (
                        <Button
                          href={`https://facebook.com/${e.socialmedia.facebook}`}
                          justIcon
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
