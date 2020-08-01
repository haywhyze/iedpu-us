import React from 'react';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CustomTabs from 'components/CustomTabs/CustomTabs';

import AboutUs from './AboutUs';
import Executives from './Executives/Executives';
import BOT from './BOT/Executives';
import AdCouncil from './AdCouncil/Executives';

export default function EventsMeetings() {
  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: 'About',
                tabContent: (
                  <>
                    <AboutUs />
                  </>
                ),
              },
              {
                tabName: 'Executives',
                tabContent: (
                  <>
                    <Executives />
                  </>
                ),
              },
              {
                tabName: 'Board of Trustees',
                tabContent: (
                  <>
                    <BOT />
                  </>
                ),
              },
              {
                tabName: 'Advisory Council',
                tabContent: (
                  <>
                    <AdCouncil />
                  </>
                ),
              },
              // {
              //   tabName: 'Defaulters',
              //   tabContent: (
              //     <>
              //       <h3>Defaulters</h3>
              //     </>
              //   ),
              // },
            ]}
          />
        </GridItem>
      </GridContainer>
    </>
  );
}
