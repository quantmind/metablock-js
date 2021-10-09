import { Theme } from "@mui/material/styles";

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

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
