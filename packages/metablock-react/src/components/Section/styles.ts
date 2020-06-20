import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => {
  const p = theme.palette;

  return createStyles({
    container: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(10),
      display: "flex",
      position: "relative",
      backgroundColor: p.background.default,
    },
  });
});
