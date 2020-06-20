import { createStyles, makeStyles } from "@material-ui/core/styles";

const headerStyles = makeStyles(() =>
  createStyles({
    appBar: {
      display: "flex",
      border: "0",
      width: "100%",
      transition: "all 150ms ease 0s",
      alignItems: "center",
      flexFlow: "row nowrap",
      justifyContent: "flex-start",
      position: "relative",
      zIndex: "unset",
    },
    container: {
      width: "100%",
    },
    absolute: {
      position: "absolute",
      zIndex: 1100,
    },
    fixed: {
      position: "fixed",
      zIndex: 1100,
    },
    flex: {
      flex: 1,
    },
    transparent: {
      backgroundColor: "transparent !important",
      boxShadow: "none",
      paddingTop: "25px",
      color: "#FFFFFF",
    },
    appResponsive: {
      margin: "20px 10px",
    },
  })
);

export default headerStyles;
