import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import {
  Theme,
  ThemeProvider,
  createTheme,
  useTheme,
} from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";
import { Crumb } from "../utils/breadcrumbs";

const pillsTheme = (theme: Theme) =>
  createTheme(theme, {
    components: {
      // Name of the component
      MuiTabs: {
        styleOverrides: {
          root: {
            width: "100%",
            minHeight: "auto",
          },
          indicator: {
            display: "none",
          },
          centered: {
            alignItems: "center",
            justifyContent: "center",
          },
        },
      },
      MuiTab: {
        root: {
          position: "relative",
          borderRadius: theme.spacing(2),
          textAlign: "center",
          transition: "all .5s",
          color: theme.palette.text.secondary,
          height: "auto",
          minHeight: "auto",
          minWidth: theme.spacing(15),
          opacity: "1",
          float: "none",
          "&$selected": {
            "&, &:hover": {
              color: theme.palette.info.contrastText,
              backgroundColor: theme.palette.info.dark,
            },
          },
        },
        selected: {},
        wrapper: {
          lineHeight: "24px",
          textTransform: "uppercase",
          fontSize: "12px",
          fontWeight: 500,
          position: "relative",
          display: "block",
          color: "inherit",
        },
      },
    },
  });

interface PillTabsProps {
  tabs: Crumb[];
  tabIndex: string;
}

const PillTabs = (props: PillTabsProps) => {
  const { tabs, tabIndex } = props;
  const theme = pillsTheme(useTheme());
  if (tabs.length === 0) return null;
  const values = new Set(tabs.map((tab: Crumb) => tab.to));
  const dummyTab = values.has(tabIndex) ? null : <Tab value={tabIndex} />;
  return (
    <ThemeProvider theme={theme}>
      <Tabs value={tabIndex}>
        {dummyTab}
        {tabs.map((crumb: Crumb, index: number) =>
          crumb.to ? (
            <Tab
              key={index}
              label={crumb.text}
              value={crumb.to}
              component={Link}
              to={crumb.to}
            />
          ) : (
            <Tab key={index} label={crumb.text} />
          )
        )}
      </Tabs>
    </ThemeProvider>
  );
};

export default PillTabs;
