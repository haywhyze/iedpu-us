import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import List from "@material-ui/icons/List";
import Money from "@material-ui/icons/Money";
import People from "@material-ui/icons/People";
import Feedback from "@material-ui/icons/FeedbackOutlined";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import ProfileUpdate from "./ProfileUpdate";

import styles from "assets/jss/material-kit-react/views/componentsSections/tabsStyle.js";
import MembersList from "./MembersList";

const useStyles = makeStyles(styles);

export default function SectionTabs() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.container}>
        <div id="nav-tabs">
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <CustomTabs
                headerColor="primary"
                tabs={[
                  {
                    tabName: "Profile",
                    tabIcon: Face,
                    tabContent: (
                      <>
                        <h3>Update Profile</h3>
                        <ProfileUpdate />
                      </>
                    ),
                  },
                  {
                    tabName: "Membership Fees",
                    tabIcon: Money,
                    tabContent: (
                      <>
                        <h3>Settle Membership Fees</h3>
                      </>
                    ),
                  },
                  {
                    tabName: "Members List",
                    tabIcon: People,
                    tabContent: (
                      <>
                        <h3>Get to know other Members</h3>
                        <MembersList />
                      </>
                    ),
                  },
                  {
                    tabName: "Payments History",
                    tabIcon: List,
                    tabContent: (
                      <>
                        <h3>Track Payment History</h3>
                      </>
                    ),
                  },
                  {
                    tabName: "Feedback",
                    tabIcon: Feedback,
                    tabContent: (
                      <>
                        <h3>Give Feedback</h3>
                      </>
                    ),
                  },
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
