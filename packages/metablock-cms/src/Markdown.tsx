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
      "& p": {
        fontSize: theme.typography.body1.fontSize,
        fontFamily: theme.typography.body1.fontFamily,
      },
      "& a": {
        textDecoration: "none",
        color: palette[anchor].main,
      },
      "& pre": {
        overflowX: "scroll",
      },
    };
  },
}));

const Markdown = (props: any) => {
  const {
    escapeHtml = false,
    body,
    plugins = [],
    renderers = {},
    style = coy,
    ...extra
  } = props;
  const classes = useStyles(extra);

  const CodeBlock = (props: any) => {
    const { language, value } = props;
    console.log(props);
    return (
      <SyntaxHighlighter language={language} style={style} {...extra}>
        {value}
      </SyntaxHighlighter>
    );
  };

  const render = { code: CodeBlock, ...renderers };

  return (
    <ReactMarkdown
      className={classes.markdown}
      escapeHtml={escapeHtml}
      source={body}
      plugins={plugins}
      renderers={render}
    />
  );
};

export default Markdown;
