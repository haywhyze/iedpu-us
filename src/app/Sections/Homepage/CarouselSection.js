import React from 'react';
// react component for creating beautiful carousel
import Carousel from 'react-slick';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Card from 'components/Card/Card.js';

import styles from 'assets/jss/material-kit-react/views/componentsSections/carouselStyle.js';

const useStyles = makeStyles(styles);

export default function SectionCarousel() {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
            <Card>
              <Carousel {...settings}>
                <div>
                  <img
                    src="img/bg.jpg"
                    alt="First slide"
                    className="slick-image"
                    style={{ height: '25rem', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <img
                    src="img/bg2.jpg"
                    alt="Second slide"
                    className="slick-image"
                    style={{ height: '25rem', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <img
                    src="img/bg3.jpg"
                    alt="Third slide"
                    className="slick-image"
                    style={{ height: '25rem', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <img
                    src="img/bg4.jpg"
                    alt="Third slide"
                    className="slick-image"
                    style={{ height: '25rem', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <img
                    src="img/bg7.png"
                    alt="Third slide"
                    className="slick-image"
                    style={{ height: '25rem', objectFit: 'cover' }}
                  />
                </div>
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
