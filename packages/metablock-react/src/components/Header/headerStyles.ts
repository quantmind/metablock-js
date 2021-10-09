import { Theme } from "@mui/material/styles";

import makeStyles from '@mui/styles/makeStyles';

export default makeStyles((theme: Theme) => ({
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
    paddingBottom: (props: any) => theme.spacing(props.paddingBottom || 0),
    paddingTop: (props: any) => theme.spacing(props.paddingTop || 0),
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
  appResponsive: {
    margin: "20px 10px",
  },
  defaultColor(props: any) {
    return {
      backgroundColor: `${props.backgroundColor} !important`,
      color: props.color,
      boxShadow: "none",
    };
  },
  colorChange(props: any) {
    return {
      backgroundColor: `${props.changeColorOnScroll?.backgroundColor} !important`,
      color: `${props.changeColorOnScroll?.color} !important`,
    };
  },
}));
