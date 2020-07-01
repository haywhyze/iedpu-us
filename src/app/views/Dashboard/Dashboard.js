import React, { useState } from 'react';
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Store from '@material-ui/icons/Store';
import Update from '@material-ui/icons/Update';
import HourGlassEmpty from '@material-ui/icons/HourGlassEmpty';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import CustomTabs from 'components/CustomTabs/CustomTabs.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardFooter from 'components/Card/CardFooter.js';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import Notifications from '../../Sections/utils/Notification';
import DeleteCell from '../../Sections/utils/DeleteCell';
import ConfirmCell from '../../Sections/utils/ConfirmCell';

const useStyles = makeStyles(styles);

export default function Dashboard({ members }) {
  const classes = useStyles();
  const [successNotification, setSuccessNotification] = useState(false);
  const [failureNotification, setFailureNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const unconfirmedMembers = members.reduce((filtered, member) => {
    if (!member.verified) {
      filtered.push(member);
    }
    return filtered;
  }, []);
  const confirmedMembers = members.reduce((filtered, member) => {
    if (member.verified) {
      filtered.push(member);
    }
    return filtered;
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>people</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Registered Users</p>
              <h3 className={classes.cardTitle}>{members.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Donations</p>
              <h3 className={classes.cardTitle}>$3,295</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>all_inclusive</Icon>
                All Time
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Membership Fees </p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>all_inclusive</Icon>
                All Time
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Feedback Received</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          {successNotification && (
            <Notifications type="success" message={successMessage} />
          )}
          {failureNotification && (
            <Notifications type="danger" message={errorMessage} />
          )}
          <CustomTabs
            title="Recent Members:"
            headerColor="primary"
            tabs={[
              {
                tabName: 'Unconfirmed',
                tabIcon: HourGlassEmpty,
                tabContent: unconfirmedMembers.length ? (
                  <Table
                    tableHeaderColor="primary"
                    tableHead={['Name', 'Email Adddress', 'Verify', 'Remove']}
                    tableData={unconfirmedMembers.map((member) => {
                      const newValue = [];
                      newValue.push(member.displayName);
                      newValue.push(member.email);
                      newValue.push(
                        <ConfirmCell
                          user={member}
                          setErrorMessage={setErrorMessage}
                          setSuccessMessage={setSuccessMessage}
                          setSuccessNotification={setSuccessNotification}
                          setFailureNotification={setFailureNotification}
                        />,
                      );
                      newValue.push(
                        <DeleteCell
                          user={member}
                          setSuccessMessage={setSuccessMessage}
                          setErrorMessage={setErrorMessage}
                          setSuccessNotification={setSuccessNotification}
                          setFailureNotification={setFailureNotification}
                        />,
                      );
                      return newValue;
                    })}
                  />
                ) : (
                  <h3 style={{ textAlign: 'center' }}>
                    No new member request at this time
                  </h3>
                ),
              },
              {
                tabName: 'Confirmed',
                tabIcon: VerifiedUser,
                tabContent: (
                  <Table
                    tableHeaderColor="primary"
                    tableHead={['Name', 'Email Address']}
                    tableData={confirmedMembers.map((member) => {
                      const newValue = [];
                      newValue.push(member.displayName);
                      newValue.push(member.email);
                      return newValue;
                    })}
                  />
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
