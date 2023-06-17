import React, { useState, useEffect, useContext } from 'react';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import PayFees from './PayFees';
import ViewDetails from '../../views/Payments/ViewDetails';
// import CircularProgress from '@material-ui/core/CircularProgress';

export default function MembershipFees({
  payments, fees, db, user,
}) {
  const paymentsIntent = payments.map((p) => p.intent);

  const feesData = fees.map((fee) => {
    const paid = paymentsIntent.includes(fee.name);

    return [
      fee.name,
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(fee.price),
      new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(new Date(fee.expiryDate)),
      paid ? (
        'Paid'
      ) : (
        <PayFees amount={fee.price} user={user} intent={fee.name} db={db} />
      ),
    ];
  });

  return (
    <>
      <h2>Settle Membership Fees</h2>
      {fees.length ? (
        <Table
          tableHeaderColor="info"
          tableHead={['Name', 'Price', 'Deadline for Payment', 'Status']}
          tableData={feesData}
        />
      ) : (
        <h4 style={{ textAlign: 'center' }}>No fees record yet</h4>
      )}
    </>
  );
}
