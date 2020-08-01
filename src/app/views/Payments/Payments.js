import React from "react";
// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Donations from "./Donations";
import MembershipFees from "./MembershipFees";
import PayableFees from "./Fees";

export default function Payments({ members }) {
  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: "Donations",
                tabContent: (
                  <>
                    <Donations />
                  </>
                ),
              },
              {
                tabName: "Membership Fees",
                tabContent: (
                  <>
                    <MembershipFees members={members} />
                  </>
                ),
              },
              {
                tabName: "Payable Fees",
                tabContent: (
                  <>
                    <PayableFees />
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
