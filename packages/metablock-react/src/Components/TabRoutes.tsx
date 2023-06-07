import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Theme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import MuiTabs from "@mui/material/Tabs";
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
  const { routes, children, value, maxWidth = "lg", ...tabProps } = props;

  return (
    <>
      <MuiTabs value={value} {...tabProps}>
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
