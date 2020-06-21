import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import styles from 'assets/jss/material-kit-react/views/landingPageSections/productStyle.js';
import { Typography, List, ListItem } from '@material-ui/core';
import CarouselSection from './CarouselSection';

const useStyles = makeStyles(styles);

export default function HomeSection() {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>About IEDPU </h2>
          <Typography variant="body1" gutterBottom>
            Ilorin Emirate Descendants Progressive Union (IEDPU) is a sole
            entity, commonly regarded as the mother of associations in Ilorin
            Emirate, with branches caught across the five Local Government Areas
            in Ilorin (Asa, Ilorin East, Ilorin South, Ilorin West, and Moro
            Local Government) and other parts of the world.
          </Typography>
          <br />
          <Typography variant="body1" gutterBottom>
            The Union was reputedly set up in 1941 before the disintegration of
            Ilorin into five Local Government Areas, and it has since played an
            active role in fostering unity among Indigenes at home and abroad.
          </Typography>
          <br />
          <Typography variant="body1" gutterBottom>
            The IEDPU, in its efforts to consolidate an active, progressive, and
            democratic body for the development and progress of the Emirate and
            indigenes, in 2015 incorporated the
            {' '}
            <a href="https://www.iedpu.com.ng/docs/iedpu_constitution.pdf">
              IEDPU Constitution
            </a>
            {' '}
            to ensure the realization of its ideals. The provisions of this
            constitution are legally binding on all members, the National
            Executive Council, Zones, and Branches of the Union. Hence, the
            Union objectives are as follows:
          </Typography>
          <List>
            <ListItem>
              Foster and promote unity; progress and mutual understanding
              among the indigenes of Ilorin Emirate;
            </ListItem>
            <ListItem>Promote better understanding with other communities;</ListItem>
            <ListItem>Participate in the socio-economic development of the community.</ListItem>
          </List>
        </GridItem>
      </GridContainer>
      <div>
        <CarouselSection />
      </div>
    </div>
  );
}
