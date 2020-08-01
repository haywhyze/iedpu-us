import React, { useState, useEffect, useContext } from "react";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";

export default function PaymentsHistory({ payments }) {
  const membershipFeesData = payments.map((fees) => [
    fees.name,
    fees.email,
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(fees.amount),
    fees.intent,
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(fees.date),
    fees.transaction_id,
  ]);
  return (
    <>
      <h2>Track History of Payments</h2>
      <GridContainer>
        <Card plain>
          <CardBody>
            {membershipFeesData.length ? (
              <Table
                tableHeaderColor="info"
                tableHead={[
                  "Name",
                  "Email",
                  "Amount",
                  "Payment for",
                  "Date",
                  "Transaction ID",
                ]}
                tableData={membershipFeesData.sort(
                  (a, b) => Date.parse(b[4]) - Date.parse(a[4])
                )}
              />
            ) : (
              <h4 style={{ textAlign: "center" }}>No membership fees record</h4>
            )}
          </CardBody>
        </Card>
      </GridContainer>
    </>
  );
}
