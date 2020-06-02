import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function Payments() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Donations</h4>
            <p className={classes.cardCategoryWhite}>List of all donations</p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Email", "Date", "Amount"]}
              tableData={[
                [
                  "Dakota Rice",
                  "yusufayo19@yahoo.com",
                  "May 19, 2020",
                  "$36,738",
                ],
                [
                  "Dakota Rice",
                  "yusufayo19@yahoo.com",
                  "May 19, 2020",
                  "$36,738",
                ],
                [
                  "Dakota Rice",
                  "yusufayo19@yahoo.com",
                  "May 19, 2020",
                  "$36,738",
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
                "Name",
                "Email",
                "Date",
                "Payment for",
                "Amount",
                "Transaction ID",
              ]}
              tableData={[
                [
                  "Dakota Rice",
                  "yusufayo19@yahoo.com",
                  "May 19, 2020",
                  "January, 2020",
                  "$20",
                  "ILcd6vAJDONTL2FfZpdhwIFlyzf1",
                ],
                [
                  "Dakota Rice",
                  "yusufayo19@yahoo.com",
                  "May 19, 2020",
                  "January, 2020",
                  "$20",
                  "ILcd6vAJDONTL2FfZpdhwIFlyzf1",
                ],
                [
                  "Dakota Rice",
                  "yusufayo19@yahoo.com",
                  "May 19, 2020",
                  "January, 2020",
                  "$20",
                  "ILcd6vAJDONTL2FfZpdhwIFlyzf1",
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
              tableHead={["Name", "Email", "Fees owed"]}
              tableData={[
                ["Dakota Rice", "haywhyze@gmail.com", "2"],
                ["Minerva Hooper", "haywhyze@gmail.com", "2"],
                ["Sage Rodriguez", "haywhyze@gmail.com", "2"],
                ["Philip Chaney", "haywhyze@gmail.com", "2"],
                ["Doris Greene", "haywhyze@gmail.com", "2"],
                ["Mason Porter", "haywhyze@gmail.com", "2"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      
    </GridContainer>
  );
}
