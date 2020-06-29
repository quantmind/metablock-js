import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import { getWindowSize } from "@metablock/react";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: (props: any) => ({
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    height: props.height,
  }),
}));

const EntryLoading = () => {
  const height = getWindowSize().height || 200;
  const classes = useStyles({ height: `${height}px` });
  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  );
};

export default EntryLoading;
