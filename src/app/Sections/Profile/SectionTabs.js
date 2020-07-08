import React, { useContext, useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Face from '@material-ui/icons/Face';
import List from '@material-ui/icons/List';
import Money from '@material-ui/icons/Money';
import People from '@material-ui/icons/People';
import Feedback from '@material-ui/icons/FeedbackOutlined';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import CustomTabs from 'components/CustomTabs/CustomTabs.js';
import styles from 'assets/jss/material-kit-react/views/componentsSections/tabsStyle.js';
import { db, AuthContext } from '../../pages/_app';
import ProfileUpdate from './ProfileUpdate';
import MembershipFees from './MembershipFees';

import MembersList from './MembersList';
import PaymentsHistory from './PaymentsHistory';

const useStyles = makeStyles(styles);

export default function SectionTabs() {
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const [fees, setFees] = useState([]);
  const [payments, setPayments] = useState([]);
  const paymentsRef = user
    && db
      .collection('membership_fees')
      .where('userId', '==', user.uid)
      .orderBy('date');

  const feesRef = user && db.collection('fees');

  useEffect(() => {
    if (user) {
      paymentsRef.onSnapshot(
        (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push({ ...doc.data(), id: doc.id });
          });
          setPayments(data);
        },
        (err) => {
          console.log(err);
        },
      );

      feesRef
        .get()
        .then((querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
          setFees(data);
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    }
  }, []);

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
                    tabName: 'Profile',
                    tabIcon: Face,
                    tabContent: (
                      <>
                        <h3>Update Profile</h3>
                        <ProfileUpdate />
                      </>
                    ),
                  },
                  {
                    tabName: 'Membership Fees',
                    tabIcon: Money,
                    tabContent: (
                      <>
                        <h3>Settle Membership Fees</h3>
                        <MembershipFees payments={payments} fees={fees} db={db} user={user} />
                      </>
                    ),
                  },
                  {
                    tabName: 'Members List',
                    tabIcon: People,
                    tabContent: (
                      <>
                        <h3>Get to know other Members</h3>
                        <MembersList />
                      </>
                    ),
                  },
                  {
                    tabName: 'Payments History',
                    tabIcon: List,
                    tabContent: (
                      <>
                        <h3>Track History of Payments</h3>
                        <PaymentsHistory payments={payments} />
                      </>
                    ),
                  },
                  // {
                  //   tabName: 'Feedback',
                  //   tabIcon: Feedback,
                  //   tabContent: (
                  //     <>
                  //       <h3>Give Feedback</h3>
                  //     </>
                  //   ),
                  // },
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
