import { getBlock } from "@metablock/core";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { Breadcrumbs, PillTabs } from "../components";
import { breadcrumbs, Crumb } from "../utils";
import Page from "./Page";

interface TitleProps {
  title?: any;
  tabs?: Crumb[];
  crumbs?: boolean;
  pageTitle?: string;
  children: any;
}

const Title = (props: TitleProps) => {
  const { pathname } = window.location;
  const { title = "", tabs = [], crumbs = false, children } = props;
  const block = getBlock();
  const pageTitle =
    props.pageTitle || title ? `${block.name} ${title}` : block.name;
  let tabIndex = "";
  tabs.forEach((crumb: Crumb) => {
    if (crumb.to) {
      const n = crumb.to.length;
      if (n > tabIndex.length && pathname.substring(0, n) === crumb.to)
        tabIndex = crumb.to;
    }
  });
  return (
    <Page title={pageTitle}>
      <Box pt={1} pb={1}>
        <Grid container spacing={1}>
          {crumbs ? (
            <Grid item sm>
              <Breadcrumbs crumbs={breadcrumbs()} />
            </Grid>
          ) : null}
          <Grid item sm>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item>
                <PillTabs tabs={tabs} tabIndex={tabIndex} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {title ? (
          <Typography component="h1" variant="h5" align="center" pt={1} pb={1}>
            {title}
          </Typography>
        ) : null}
      </Box>
      {children}
    </Page>
  );
};

export default Title;
