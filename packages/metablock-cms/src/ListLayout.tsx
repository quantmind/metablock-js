import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Image, Link, UnsplashImage } from "@metablock/react";
import React from "react";
import { CmsListProps } from "./interfaces";
import { dateFormat } from "./op";

const useStyle = makeStyles((theme: Theme) => ({
  private: {
    backgroundColor: theme.palette.action.disabled,
    width: "100%",
  },
  placeholder: (props: any) => {
    const { imageWidth = 200, imageHeight = 150 } = props;
    return {
      width: `${imageWidth}px`,
      height: `${imageHeight}px`,
      position: "relative",
    };
  },
  public: {},
}));

const imageProvider = (props: any) => {
  const { image, defaultUnsplash } = props;
  if (image) {
    const bits = image.split("-");
    if (bits[0] === "unsplash")
      return { provider: "unsplash", id: bits.slice(1).join("-") };
    else return { urls: [image] };
  } else if (defaultUnsplash) {
    return { provider: "unsplash", id: defaultUnsplash };
  } else return {};
};
const EntryImage = (props: any) => {
  const { title, className } = props;
  const image = imageProvider(props);
  if (image.provider === "unsplash")
    return (
      <UnsplashImage
        photoId={image.id}
        alt={title}
        fit="width"
        className={className}
      />
    );
  else if (image.urls)
    return <Image {...image} alt={title} className={className} fit="width" />;
  else return <div className={className} />;
};

const ListLayout = (props: CmsListProps) => {
  const { data, defaultUnsplash, ...extra } = props;
  const classes = useStyle(extra);
  return (
    <List>
      {data.map((entry, index) => (
        <ListItem key={index}>
          <div className={entry.private ? classes.private : classes.public}>
            <Link to={entry.urlPath} color="inherit" underline="none">
              <Grid container spacing={3}>
                <Grid item>
                  <EntryImage
                    {...entry}
                    defaultUnsplash={defaultUnsplash}
                    className={classes.placeholder}
                  />
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
