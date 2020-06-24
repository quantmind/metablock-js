import CssBaseline from "@material-ui/core/CssBaseline";
import { Theme, ThemeProvider } from "@material-ui/core/styles";
import { getBlock } from "@metablock/core";
import React from "react";
import { hydrate } from "react-dom";
import { Router } from "react-router-dom";
import { BlockContext } from "./block";
import history from "./history";

const dom = (Component: React.FC, theme: Theme) => {
  const root = document.getElementById("__metablock");
  const config = getBlock();

  hydrate(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <BlockContext.Provider value={config}>
          <CssBaseline />
          <Component />
        </BlockContext.Provider>
      </ThemeProvider>
    </Router>,
    root
  );
};

export default dom;
