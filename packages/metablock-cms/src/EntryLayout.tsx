import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Page, Parallax } from "@metablock/react";
import React from "react";
import ReactMarkdown from "react-markdown";
import { CmsData } from "./interfaces";
import { dateFormat } from "./op";

const EntryLayout = (props: CmsData) => {
  const maxWidth = "md";
  const { body, author, ...extra } = props;
  const formatDate =
    props.date instanceof Date ? ` on ${dateFormat()(props.date)}` : "";
  return (
    <Page {...extra} prefix={false}>
      <Parallax small>
        <Container maxWidth={maxWidth}>
          <Typography component="h1" variant="h3" align="center" paragraph>
            {extra.title}
          </Typography>
          <Typography
            component="h5"
            variant="subtitle1"
            align="center"
            paragraph
          >
            by {author}
            {formatDate}
          </Typography>
          {props.description ? (
            <Typography component="div" variant="h6" align="center">
              {props.description}
            </Typography>
          ) : null}
        </Container>
      </Parallax>
      <Container maxWidth={maxWidth}>
        <Box pt={3} pb={4}>
          <ReactMarkdown source={body} />
        </Box>
      </Container>
    </Page>
  );
};

export default EntryLayout;
