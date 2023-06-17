import React, { useState, useEffect, useContext } from 'react';

// core components
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import Button from 'components/CustomButtons/Button.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardBody from 'components/Card/CardBody.js';
import { AuthContext, db } from '../../pages/_app';
import NewFeesModal from './NewFeesModal';


export default function PayableFees() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [fees, setFees] = useState([]);
  const [feesModal, setFeesModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const feesRef = user && db.collection('fees');

  useEffect(() => {
    if (user) {
      feesRef.get().then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push({ ...doc.data(), id: doc.id });
        });
        setLoading(false);
        setFees(data);
      }, (err) => {
        console.log(err);
        setLoading(false);
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

  const feesData = fees.map((fee) => [
    fee.name,
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(fee.price),
    new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(new Date(fee.expiryDate)),
  ]);
  return (
    <>
      <NewFeesModal
        feesModal={feesModal}
        setFeesModal={setFeesModal}
      />
      <GridContainer>
        <Card plain>
          <CardBody>
            <Button
              onClick={() => setFeesModal(true)}
              color="primary"
              size="lg"
            >
              Create new payable fee
            </Button>
            {fees.length ? (
              <Table
                tableHeaderColor="info"
                tableHead={[
                  'Name',
                  'Price',
                  'Deadline for Payment',
                ]}
                tableData={feesData}
              />
            ) : <h4 style={{ textAlign: 'center' }}>No fees record yet</h4>}
          </CardBody>
        </Card>
      </GridContainer>
    </>
  );
}
