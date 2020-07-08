import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "@metablock/react";
import React from "react";
import { CmsListProps } from "./interfaces";
import { dateFormat } from "./op";

const useStyle = makeStyles((theme: Theme) => ({
  private: {
    backgroundColor: theme.palette.action.disabled,
    width: "100%",
  },
  placeholder: {
    width: "200px",
  },
  public: {},
}));

const ListLayout = (props: CmsListProps) => {
  const { data } = props;
  const classes = useStyle();
  return (
    <List>
      {data.map((entry, index) => (
        <ListItem key={index}>
          <div className={entry.private ? classes.private : classes.public}>
            <Link to={entry.urlPath} color="inherit" underline="none">
              <Grid container spacing={3}>
                <Grid item>
                  {entry.image ? (
                    <img alt={entry.title} src={entry.image} width="200" />
                  ) : (
                    <div className={classes.placeholder} />
                  )}
                </Grid>
                <Grid item xs={12} sm container>
                  <ListItemText
                    primary={
                      <Typography component="h2" variant="h5">
                        {entry.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography component="p" variant="subtitle1">
                          {entry.description}
                        </Typography>
                        <Typography component="p" variant="subtitle2">
                          by {entry.author}
                          {entry.date instanceof Date
                            ? ` on ${dateFormat()(entry.date)}`
                            : ""}
                        </Typography>
                      </>
                    }
                  />
                </Grid>
              </Grid>
            </Link>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default ListLayout;
