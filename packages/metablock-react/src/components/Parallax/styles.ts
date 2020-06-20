import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => {
  return createStyles({
    relative: {
      position: "relative",
      width: "100%",
    },
    parallax: {
      position: "relative",
      height: "90vh",
      maxHeight: "1000px",
      overflow: "hidden",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      margin: "0",
      padding: "0",
      border: "0",
      display: "flex",
      alignItems: "center",
      backgroundImage: (props: any) =>
        props.image ? `url("${props.image}")` : "none",
    },
    filter: {
      "&:before": {
        backgroundColor: (props: any) =>
          `rgba(0, 0, 0, ${props.filter || 0.5})`,
        position: "absolute",
        content: "''",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
      },
    },
    small: {
      height: "380px",
    },
  });
});

export default useStyles;
