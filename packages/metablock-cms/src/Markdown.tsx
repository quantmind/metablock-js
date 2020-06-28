import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

const useStyles = makeStyles((theme: Theme) => ({
  markdown: (props: any) => {
    const { anchor = "primary" } = props;
    const palette: any = theme.palette;
    return {
      "& a": {
        textDecoration: "none",
        color: palette[anchor].main,
      },
    };
  },
}));

const CodeBlock = (props: any) => {
  const { language, value } = props;
  return (
    <SyntaxHighlighter language={language} style={coy}>
      {value}
    </SyntaxHighlighter>
  );
};

const Markdown = (props: any) => {
  const { escapeHtml = false, anchor = "primary", body } = props;
  const classes = useStyles({ anchor });
  return (
    <ReactMarkdown
      className={classes.markdown}
      escapeHtml={escapeHtml}
      source={body}
      renderers={{ code: CodeBlock }}
    />
  );
};

export default Markdown;
