import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Update from "@material-ui/icons/Update";
import AccessTime from "@material-ui/icons/AccessTime";
import HourGlassEmpty from "@material-ui/icons/HourGlassEmpty";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import ConfirmCell from "../../Sections/ConfirmCell";
import DeleteCell from "../../Sections/DeleteCell";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
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
              <h3 className={classes.cardTitle}>
                340
              </h3>
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
          <CustomTabs
            title="Recent Members:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Unconfirmed",
                tabIcon: HourGlassEmpty,
                tabContent: (
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Name", "City", "Email Adddress", "", ""]}
                    tableData={[
                      [
                        "Dakota Rice",
                        "Oud-Turnhout",
                        "dakota.rice@example.com",
                        <ConfirmCell />,
                        <DeleteCell />,
                      ],
                      [
                        "Minerva Hooper",
                        "Sinaai-Waas",
                        "yusuf.ayo@example.com",
                        <ConfirmCell />,
                        <DeleteCell />,
                      ],
                      [
                        "Sage Rodriguez",
                        "Baileux",
                        "new.member@example.com",
                        <ConfirmCell />,
                        <DeleteCell />,
                      ],
                    ]}
                  />
                ),
              },
              {
                tabName: "Confirmed",
                tabIcon: VerifiedUser,
                tabContent: (
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Name", "City", "Email Adddress", ""]}
                    tableData={[
                      [
                        "Dakota Rice",
                        "Oud-Turnhout",
                        "dakota.rice@example.com",
                        <DeleteCell />,
                      ],
                      [
                        "Minerva Hooper",
                        "Sinaai-Waas",
                        "yusuf.ayo@example.com",
                        <DeleteCell />,
                      ],
                      [
                        "Sage Rodriguez",
                        "Baileux",
                        "new.member@example.com",
                        <DeleteCell />,
                      ],
                    ]}
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
