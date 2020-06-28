import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

const useStyles = makeStyles((theme: Theme) => ({
  markdown: (props: any) => {
    const { anchor = "primary", codePadding = 1 } = props;
    const palette: any = theme.palette;
    return {
      "& a": {
        textDecoration: "none",
        color: palette[anchor].main,
      },
      "& pre": {
        padding: theme.spacing(codePadding),
        overflowX: "scroll",
      },
    };
  },
}));

const Markdown = (props: any) => {
  const { escapeHtml = false, body, ...extra } = props;
  const classes = useStyles(extra);

  const CodeBlock = (props: any) => {
    const { language, value } = props;
    console.log(props);
    return (
      <SyntaxHighlighter language={language} style={coy} {...extra}>
        {value}
      </SyntaxHighlighter>
    );
  };

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
