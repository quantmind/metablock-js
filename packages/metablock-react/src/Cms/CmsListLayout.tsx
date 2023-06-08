import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { ImageStore, Link } from "../Components";
import { CmsListProps } from "./interfaces";
import { dateFormat } from "./op";

const EntryImage = (props: any) => {
  const { title, fit = "cover", image, defaultUnsplash, ...extra } = props;
  const img = image || `unsplash-${defaultUnsplash}`;
  return <ImageStore {...extra} image={img} alt={title} fit={fit} />;
};

const CmsListLayout = (props: CmsListProps) => {
  const { data, imageHeight = 150, ...extra } = props;
  const theme = useTheme();
  const smImageHeight = Math.ceil(0.5 * imageHeight);
  const sxImage = {
    position: "relative",
    width: `100%`,
    height: `${imageHeight}px`,
    [theme.breakpoints.down("sm")]: {
      height: `${smImageHeight}px`,
    },
  };
  const sx = (entry: any) =>
    entry.private
      ? {
          backgroundColor: "action.disabled",
          width: "100%",
          mb: 3,
        }
      : { mb: 4 };

  const linkSx = {
    width: "100%",
    ":hover": {
      backgroundColor: "action.hover",
    },
  };

  return (
    <List>
      {data.map((entry, index) => (
        <ListItem key={index} disablePadding sx={sx(entry)}>
          <Link to={entry.urlPath} color="inherit" underline="none" sx={linkSx}>
            <Grid container spacing={2}>
              <Grid xs={3} item>
                <EntryImage {...extra} {...entry} sx={sxImage} />
              </Grid>
              <Grid xs={9} item>
                <ListItemText
                  sx={{ mt: 0, mb: 0 }}
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

export default CmsListLayout;
