import React, { useState, useEffect, useContext } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardBody from 'components/Card/CardBody.js';
import { AuthContext, db } from '../../pages/_app';

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
  const [loading, setLoading] = useState(true);

  const donationsRef = user && db.collection('donations');

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
  const donationsData = donations.map((donation) => [
    donation.name,
    donation.email,
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(donation.amount),
    new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(Date.parse(donation.date)),
    donation.transaction_id,
  ]);
  return (
    <>
      <GridContainer>
        <Card>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={['Name', 'Email', 'Amount', 'Date', 'Transaction ID']}
              tableData={donationsData}
            />
          </CardBody>
        </Card>
      </GridContainer>
    </>
  );
}
