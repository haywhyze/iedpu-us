import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import ProfileModal from "../../Sections/Profile/ProfileModal";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ConfirmCell from "../../Sections/utils/ConfirmCell";
import Button from "components/CustomButtons/Button.js";
import Notifications from "../../Sections/utils/Notification";
import LaunchRoundedIcon from "@material-ui/icons/LaunchRounded";
import DeleteCell from "../../Sections/utils/DeleteCell";
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

export default function Members({ members }) {
  const classes = useStyles();
  const [successNotification, setSuccessNotification] = useState(false);
  const [failureNotification, setFailureNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [classicModal, setClassicModal] = React.useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const viewMember = (member) => {
    setSelectedMember(member);
    setClassicModal(true);
  };

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
    <GridContainer>
      <ProfileModal
        classicModal={classicModal}
        setClassicModal={setClassicModal}
        member={selectedMember}
      />
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>New Member Requests</h4>
            <p className={classes.cardCategoryWhite}>
              Unconfirmed registered users
            </p>
          </CardHeader>
          <CardBody>
            {successNotification && (
              <Notifications type="success" message={successMessage} />
            )}
            {failureNotification && (
              <Notifications type="danger" message={errorMessage} />
            )}
            {unconfirmedMembers.length ? (
              <Table
                tableHeaderColor="primary"
                tableHead={["Name", "Email", "Created", "Verify", "Discard"]}
                tableData={unconfirmedMembers.map((member) => {
                  const newValue = [];
                  const date = new Date(member.created);
                  newValue.push(member.displayName);
                  newValue.push(member.email);
                  newValue.push(
                    new Intl.DateTimeFormat("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(date)
                  );
                  newValue.push(
                    <ConfirmCell
                      user={member}
                      setErrorMessage={setErrorMessage}
                      setSuccessMessage={setSuccessMessage}
                      setSuccessNotification={setSuccessNotification}
                      setFailureNotification={setFailureNotification}
                    />
                  );
                  newValue.push(
                    <DeleteCell
                      user={member}
                      setSuccessMessage={setSuccessMessage}
                      setErrorMessage={setErrorMessage}
                      setSuccessNotification={setSuccessNotification}
                      setFailureNotification={setFailureNotification}
                    />
                  );
                  return newValue;
                })}
              />
            ) : (
              <h3 style={{ textAlign: "center" }}>
                No new member request at this time
              </h3>
            )}
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
              tableHead={["Name", "Email", "Created", "View Details"]}
              tableData={confirmedMembers.map((member) => {
                const newValue = [];
                const date = new Date(member.created);
                newValue.push(member.displayName);
                newValue.push(member.email);
                newValue.push(
                  new Intl.DateTimeFormat("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(date)
                );
                newValue.push(
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
                  </Button>
                );
                return newValue;
              })}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
