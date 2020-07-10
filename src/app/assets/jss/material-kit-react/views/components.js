import { container } from "assets/jss/material-kit-react.js";

const componentsStyle = {
  container,
  brand: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  title: {
    fontSize: "4.2rem",
    fontWeight: "600",
    display: "inline-block",
    position: "relative",
    "@media (max-width: 768px)": {
      fontSize: "2rem",
    },
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "1000px",
    lineHeight: "2",
    "@media (max-width: 768px)": {
      lineHeight: "1.5",
    },
  },
  main: {
    background: "#f0f7e2",
    position: "relative",
    zIndex: "3",
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    "@media (max-width: 768px)": {
      margin: "0 0 0 0",
    },
  },
  link: {
    textDecoration: "none",
  },
  textCenter: {
    textAlign: "center",
  },
};

export default componentsStyle;
