import React, { useState, useEffect, useContext } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardBody from 'components/Card/CardBody.js';
import Button from 'components/CustomButtons/Button.js';
import { AuthContext, db } from '../../pages/_app';
import NewFeesModal from './NewFeesModal';
import NewMembershipFeesModal from './NewMembershipFeesModal';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
};

const useStyles = makeStyles(styles);

export default function Payments() {
  const classes = useStyles();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [membershipFees, setMembershipFees] = useState([]);
  const [fees, setFees] = useState([]);
  const [feesModal, setFeesModal] = useState(false);
  const [membershipFeesModal, setMembershipFeesModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const donationsRef = user && db.collection('donations');
  const feesRef = user && db.collection('fees');
  const membershipFeesRef = user && db.collection('membershipFees');

  useEffect(() => {
    if (user) {
      donationsRef.onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push({ ...doc.data(), id: doc.id });
        });
        setLoading(false);
        setDonations(data);
      });
      membershipFeesRef.onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push({ ...doc.data(), id: doc.id });
        });
        setLoading(false);
        setMembershipFees(data);
      });
      feesRef.onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push({ ...doc.data(), id: doc.id });
        });
        setLoading(false);
        setFees(data);
      });
    }
  }, [isAuthenticated, user]);
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100%',
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <NewFeesModal feesModal={feesModal} setFeesModal={setFeesModal} />
      <NewMembershipFeesModal
        membershipFeesModal={membershipFeesModal}
        setMembershipFeesModal={setMembershipFeesModal}
      />
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Donations</h4>
              <p className={classes.cardCategoryWhite}>List of all donations</p>
            </CardHeader>
            <CardBody>
              <GridItem>
                <Button
                  onClick={() => setFees(true)}
                  color="primary"
                  size="lg"
                >
                  Create New event
                </Button>
              </GridItem>
              <Table
                tableHeaderColor="primary"
                tableHead={['Name', 'Email', 'Date', 'Amount']}
                tableData={[
                  [
                    'Dakota Rice',
                    'yusufayo19@yahoo.com',
                    'May 19, 2020',
                    '$36,738',
                  ],
                  [
                    'Dakota Rice',
                    'yusufayo19@yahoo.com',
                    'May 19, 2020',
                    '$36,738',
                  ],
                  [
                    'Dakota Rice',
                    'yusufayo19@yahoo.com',
                    'May 19, 2020',
                    '$36,738',
                  ],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="info">
              <h4 className={classes.cardTitleWhite}>Membership fees</h4>
              <p className={classes.cardCategoryWhite}>
                All membership fees payment
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="info"
                tableHead={[
                  'Name',
                  'Email',
                  'Date',
                  'Payment for',
                  'Amount',
                  'Transaction ID',
                ]}
                tableData={[
                  [
                    'Dakota Rice',
                    'yusufayo19@yahoo.com',
                    'May 19, 2020',
                    'January, 2020',
                    '$20',
                    'ILcd6vAJDONTL2FfZpdhwIFlyzf1',
                  ],
                  [
                    'Dakota Rice',
                    'yusufayo19@yahoo.com',
                    'May 19, 2020',
                    'January, 2020',
                    '$20',
                    'ILcd6vAJDONTL2FfZpdhwIFlyzf1',
                  ],
                  [
                    'Dakota Rice',
                    'yusufayo19@yahoo.com',
                    'May 19, 2020',
                    'January, 2020',
                    '$20',
                    'ILcd6vAJDONTL2FfZpdhwIFlyzf1',
                  ],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Members owing fees</h4>
              <p className={classes.cardCategoryWhite}>Something here</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="danger"
                tableHead={['Name', 'Email', 'Fees owed']}
                tableData={[
                  ['Dakota Rice', 'haywhyze@gmail.com', '2'],
                  ['Minerva Hooper', 'haywhyze@gmail.com', '2'],
                  ['Sage Rodriguez', 'haywhyze@gmail.com', '2'],
                  ['Philip Chaney', 'haywhyze@gmail.com', '2'],
                  ['Doris Greene', 'haywhyze@gmail.com', '2'],
                  ['Mason Porter', 'haywhyze@gmail.com', '2'],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
