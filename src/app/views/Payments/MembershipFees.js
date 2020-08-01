import React, { useState, useEffect, useContext } from "react";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardBody from "components/Card/CardBody.js";
import { AuthContext, db } from "../../pages/_app";
import NewMembershipFeesModal from "./NewMembershipFeesModal";

export default function MembershipFees({ members }) {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [membershipFees, setMembershipFees] = useState([]);
  const [membershipFeesModal, setMembershipFeesModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const membershipFeesRef = user && db.collection("membership_fees");

  useEffect(() => {
    if (user) {
      membershipFeesRef.onSnapshot(
        (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push({ ...doc.data(), id: doc.id });
          });
          setLoading(false);
          setMembershipFees(data);
        },
        (err) => {
          console.log(err);
          setLoading(false);
        }
      );
    }
  }, [isAuthenticated, user]);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  const membershipFeesData = membershipFees.map((fees) => [
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
      <NewMembershipFeesModal
        membershipFeesModal={membershipFeesModal}
        setMembershipFeesModal={setMembershipFeesModal}
        members={members}
      />
      <GridContainer>
        <Card plain>
          <CardBody>
            <Button
              onClick={() => setMembershipFeesModal(true)}
              color="primary"
              size="lg"
            >
              Create new membership fee record
            </Button>
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
