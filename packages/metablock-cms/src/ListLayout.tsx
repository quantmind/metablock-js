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
  const { title, ...extra } = props;
  const image = imageProvider(props);
  if (image.provider === "unsplash")
    return (
      <UnsplashImage photoId={image.id} alt={title} fit="width" {...extra} />
    );
  else if (image.urls)
    return <Image fit="width" {...image} {...extra} alt={title} />;
  else return <Box {...extra}></Box>;
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
          mb: 3,
        }
      : { mb: 4 };

  return (
    <List>
      {data.map((entry, index) => (
        <ListItem key={index} disablePadding sx={sx(entry)}>
          <Link to={entry.urlPath} color="inherit" underline="none">
            <Grid container>
              <Grid item>
                <EntryImage {...extra} {...entry} sx={sxImage} />
              </Grid>
              <Grid item xs={12} sm container>
                <ListItemText
                  sx={{ pl: 3, mt: 0, mb: 0 }}
                  disableTypography
                  primary={
                    <Typography component="h2" variant="h5">
                      {entry.title}
                    </Typography>
                  }
                  secondary={
                    <Typography component="div">
                      <Typography component="p" variant="subtitle2">
                        {entry.description}
                      </Typography>
                      <Typography
                        component="p"
                        variant="caption"
                        color="primary.main"
                      >
                        by {entry.author}
                        {entry.date instanceof Date
                          ? ` on ${dateFormat()(entry.date)}`
                          : ""}
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default ListLayout;
