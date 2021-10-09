import { makeStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
  container: {
    width: "100%",
  },
  table: {},
  header: {},
  toolbar: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  loading: {},
  fullScreen: {
    position: "absolute",
    top: 0,
    height: "100vh",
    zIndex: 99999,
  },
}));
