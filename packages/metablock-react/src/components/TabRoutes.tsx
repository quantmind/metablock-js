import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import MuiTabs from "@material-ui/core/Tabs";
import React from "react";
import { Link } from "react-router-dom";

interface TabsProps {
  routes: any[];
  value: string;
  backgroundColor?: (theme: Theme) => string;
  children: any;
  maxWidth?: any;
  [x: string]: any;
}

const TabRoutes = (props: TabsProps) => {
  const {
    routes,
    children,
    value,
    backgroundColor,
    maxWidth = "lg",
    ...tabProps
  } = props;
  const useStyles = makeStyles((theme: Theme) => {
    const root: Record<string, any> = {};
    if (backgroundColor) {
      root[" & .Mui-selected"] = {
        backgroundColor: backgroundColor(theme),
      };
    }
    return createStyles({ root });
  });
  const classes = useStyles();

  return (
    <>
      <MuiTabs value={value} {...tabProps} className={classes.root}>
        {routes.map(({ label, url }) => (
          <Tab
            key={url}
            label={label}
            value={url}
            component={Link}
            to={url}
          ></Tab>
        ))}
      </MuiTabs>
      <Box bgcolor="background.default" pt={4}>
        <Container maxWidth={maxWidth}>{children}</Container>
      </Box>
    </>
  );
};

export default TabRoutes;
