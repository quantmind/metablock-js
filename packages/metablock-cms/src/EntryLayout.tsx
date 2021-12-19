import { Page, Parallax } from "@metablock/react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React from "react";
import { CmsData } from "./interfaces";
import { dateFormat } from "./op";

const EntryLayout = (props: CmsData) => {
  const maxWidth = "md";
  const formatDate =
    props.date instanceof Date ? ` on ${dateFormat()(props.date)}` : "";
  return (
    <Page {...props} prefix={false}>
      <Parallax small>
        <Container maxWidth={maxWidth}>
          <Typography component="h1" variant="h3" align="center" paragraph>
            {props.title}
          </Typography>
          <Typography
            component="h5"
            variant="subtitle1"
            align="center"
            paragraph
          >
            by {props.author}
            {formatDate}
          </Typography>
          {props.description ? (
            <Typography component="div" variant="h6" align="center">
              {props.description}
            </Typography>
          ) : null}
        </Container>
      </Parallax>
    </Page>
  );
};

export default EntryLayout;
