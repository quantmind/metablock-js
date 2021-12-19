import { Image, Link, UnsplashImage } from "@metablock/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";
import { CmsListProps } from "./interfaces";
import { dateFormat } from "./op";

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
  const { title, className, ...extra } = props;
  const image = imageProvider(props);
  if (image.provider === "unsplash")
    return (
      <UnsplashImage
        photoId={image.id}
        alt={title}
        fit="width"
        className={className}
        {...extra}
      />
    );
  else if (image.urls)
    return <Image {...image} alt={title} className={className} fit="width" />;
  else return <div className={className} />;
};

const ListLayout = (props: CmsListProps) => {
  const { data, imageWidth = 200, imageHeight = 150, ...extra } = props;
  const sxImage = {
    width: `${imageWidth}px`,
    height: `${imageHeight}px`,
    position: "relative",
  };
  const sx = (entry: any) =>
    entry.private
      ? {
          backgroundColor: "action.disabled",
          width: "100%",
        }
      : {};

  return (
    <List>
      {data.map((entry, index) => (
        <ListItem key={index}>
          <Box sx={sx(entry)}>
            <Link to={entry.urlPath} color="inherit" underline="none">
              <Grid container spacing={3}>
                <Grid item>
                  <EntryImage
                    {...extra}
                    {...entry}
                    imageHeight={imageHeight}
                    imageWidth={imageWidth}
                    sx={sxImage}
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
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default ListLayout;
