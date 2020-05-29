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
import ConfirmCell from "../../Sections/ConfirmCell";
import Button from "components/CustomButtons/Button.js";
import LaunchRoundedIcon from "@material-ui/icons/LaunchRounded";
import DeleteCell from "../../Sections/DeleteCell";
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

export default function Members() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>New Member Requests</h4>
            <p className={classes.cardCategoryWhite}>
              Unconfirmed registered users
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Email", "Created", "", ""]}
              tableData={[
                [
                  "Dakota Rice",
                  "yusufayo19@yahoo.com",
                  "May 19, 2020",
                  <ConfirmCell />,
                  <DeleteCell />,
                ],
                [
                  "Yusuf  Ayo",
                  "haywhyze@gmail.com",
                  "May 19, 2020",
                  <ConfirmCell />,
                  <DeleteCell />,
                ],
                [
                  "Dakota Rice",
                  "yusufayo19@yahoo.com",
                  "May 19, 2020",
                  <ConfirmCell />,
                  <DeleteCell />,
                ],
                [
                  "Ayo Yusuf",
                  "haywhyze@gmail.com",
                  "May 19, 2020",
                  <ConfirmCell />,
                  <DeleteCell />,
                ],
                [
                  "Dakota Rice",
                  "yusufayo19@yahoo.com",
                  "May 19, 2020",
                  <ConfirmCell />,
                  <DeleteCell />,
                ],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Members List</h4>
            <p className={classes.cardCategoryWhite}>
              All confirmed registered members
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Email", "Created", "", ""]}
              tableData={[
                [
                  "Dakota Rice",
                  "yusufayo19@yahoo.com",
                  "May 19, 2020",

                  <Button
                    onClick={() => viewMember(member)}
                    color="transparent"
                    style={{
                      padding: "0.2rem 0.9375rem",
                      fontWeight: "400",
                      fontSize: "12px",
                    }}
                  >
                    <LaunchRoundedIcon fontSize="small" />
                  </Button>,
                  <DeleteCell />,
                ],
                [
                  "Yusuf  Ayo",
                  "haywhyze@gmail.com",
                  "May 19, 2020",
                  <Button
                    onClick={() => viewMember(member)}
                    color="transparent"
                    style={{
                      padding: "0.2rem 0.9375rem",
                      fontWeight: "400",
                      fontSize: "12px",
                    }}
                  >
                    <LaunchRoundedIcon fontSize="small" />
                  </Button>,
                  <DeleteCell />,
                ],
                [
                  "Dakota Rice",
                  "yusufayo19@yahoo.com",
                  "May 19, 2020",
                  <Button
                    onClick={() => viewMember(member)}
                    color="transparent"
                    style={{
                      padding: "0.2rem 0.9375rem",
                      fontWeight: "400",
                      fontSize: "12px",
                    }}
                  >
                    <LaunchRoundedIcon fontSize="small" />
                  </Button>,
                  <DeleteCell />,
                ],
                [
                  "Ayo Yusuf",
                  "haywhyze@gmail.com",
                  "May 19, 2020",
                  <Button
                    onClick={() => viewMember(member)}
                    color="transparent"
                    style={{
                      padding: "0.2rem 0.9375rem",
                      fontWeight: "400",
                      fontSize: "12px",
                    }}
                  >
                    <LaunchRoundedIcon fontSize="small" />
                  </Button>,
                  <DeleteCell />,
                ],
                [
                  "Dakota Rice",
                  "yusufayo19@yahoo.com",
                  "May 19, 2020",
                  <Button
                    onClick={() => viewMember(member)}
                    color="transparent"
                    style={{
                      padding: "0.2rem 0.9375rem",
                      fontWeight: "400",
                      fontSize: "12px",
                    }}
                  >
                    <LaunchRoundedIcon fontSize="small" />
                  </Button>,
                  <DeleteCell />,
                ],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
