import React, { useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Router from "next/router";
import Link from "next/link";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { AuthContext } from "./_app";

const useStyles = makeStyles(styles);

function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { signInWithFacebook, signInWithGoogle, isAuthenticated } = useContext(
    AuthContext
  );

  const { ...rest } = props;

  React.useEffect(() => {
    if (isAuthenticated) {
      Router.push("/profile");
    }
  }, [isAuthenticated]);

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="IEDPU"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(img/central-mosque-1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Sign in with</h4>
                    <div className={classes.socialLine}>
                      <Button color="transparent" onClick={signInWithFacebook}>
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button color="transparent" onClick={signInWithGoogle}>
                        <i className={"fab fa-google"} />
                      </Button>
                    </div>
                    <p className={classes.divider}>
                      to join other members of the community
                    </p>
                  </CardHeader>
                  <CardFooter className={classes.cardFooter}>
                    <Link href="/">
                      <span>
                        <Button simple color="primary" size="lg">
                          Return to homepage
                        </Button>
                      </span>
                    </Link>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

export default LoginPage;
