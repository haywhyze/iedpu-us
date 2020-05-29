import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import SingleNews from "./SingleNews";
const avatar = "/img/sidebar-2.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function EventsMeetings() {
  const classes = useStyles();
  return (
    <>
      <GridContainer spacing={2}>
        <GridItem>
          <Button color="primary" size="lg">
            Create New Post
          </Button>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <Card plain>
          <CardHeader color="primary" plain>
            <h4 className={classes.cardTitleWhite}>News and Articles</h4>
            <p className={classes.cardCategoryWhite}>
              Manage all news and feature articles
            </p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <SingleNews
                image={avatar}
                title="Lorem Ipsum"
                description="Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book."
                author="Admin"
                time="Fri, May 1, 2020, 12:00 AM"
              />
              <SingleNews
                image={avatar}
                title="Lorem Ipsum"
                description="Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book."
                author="Admin"
                time="Fri, May 1, 2020, 12:00 AM"
              />
              <SingleNews
                image={avatar}
                title="Lorem Ipsum"
                description="Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book."
                author="Admin"
                time="Fri, May 1, 2020, 12:00 AM"
              />
              <SingleNews
                image={avatar}
                title="Lorem Ipsum"
                description="Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book."
                author="Admin"
                time="Fri, May 1, 2020, 12:00 AM"
              />
              <SingleNews
                image={avatar}
                title="Lorem Ipsum"
                description="Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book."
                author="Admin"
                time="Fri, May 1, 2020, 12:00 AM"
              />
              <SingleNews
                image={avatar}
                title="Lorem Ipsum"
                description="Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book."
                author="Admin"
                time="Fri, May 1, 2020, 12:00 AM"
              />
            </GridContainer>
          </CardBody>
        </Card>
      </GridContainer>
    </>
  );
}
