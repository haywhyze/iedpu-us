import React, { useEffect, useState, useContext } from "react";
import Router, { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../_app";

import routes from "../../routes";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

const bgImage = "../img/sidebar-2.jpg";
const logo = "../img/logo.png";

const useStyles = makeStyles(styles);

export default function ({ ...rest }) {
  const router = useRouter();
  const { section } = router.query;
  const { user, isAdmin, isAuthenticated } = useContext(AuthContext);

  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [currentSection, setCurrentSection] = useState(null);
  const [switchRoutes, setSwitchRoutes] = useState(null);
  useEffect(() => {
    setSwitchRoutes(
      <>
        {routes.map((prop, key) => {
          if (prop.layout === "/admin" && prop.path === "/" + section) {
            setCurrentSection(prop);
            return <prop.component key={key + prop.path} />;
          }
        })}
      </>
    );
  }, [router.query, currentSection]);

  React.useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/admin-login");
    }
  }, [isAuthenticated]);

  React.useEffect(() => {
    Router.prefetch("/admin-login");
  }, []);

  if (!isAdmin) {
    Router.push("/login");
    return null;
  }

  if (!process.browser) return null;
  if (!isAuthenticated) return null;
  return (
    <BrowserRouter>
    {console.log(isAdmin, isAuthenticated)}
      {isAuthenticated && isAdmin && <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={"IEDPU"}
          logo={logo}
          image={bgImage}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={"purple"}
          {...rest}
        />
        <div className={classes.mainPanel} ref={mainPanel}>
          <Navbar
            routes={routes}
            route={currentSection}
            handleDrawerToggle={handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and container classes are present because they have some paddings which would make the map smaller */}
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          <Footer />
        </div>
      </div>}
    </BrowserRouter>
  );
}
