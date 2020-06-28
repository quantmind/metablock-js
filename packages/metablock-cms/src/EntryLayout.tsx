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
      <Container maxWidth={maxWidth}>
        <Box pt={3} pb={4}>
          <Markdown {...props} />
        </Box>
      </Container>
    </Page>
  );
};

export const Markdown = (props: any) => {
  const { escapeHtml = false, body } = props;
  return <ReactMarkdown escapeHtml={escapeHtml} source={body} />;
};

export default EntryLayout;
