import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/icons/Menu";
import clsx from "clsx";
import React from "react";
import createColorChange from "./colorChange";
import useStyles from "./headerStyles";

interface HeaderProps {
  color?: string;
  fixed?: boolean;
  absolute?: boolean;
  maxWidth?: any;
  brandComponent?: React.ReactNode;
  leftLinks?: React.ReactNode;
  rightLinks?: React.ReactNode;
  paddingTop?: number;
  paddingBottom?: number;
  changeColorOnScroll?: {
    height: number;
    color: string;
  };
}

const Header = (props: HeaderProps) => {
  const classes: Record<string, any> = useStyles();
  const {
    color = "transparent",
    maxWidth = "lg",
    fixed,
    absolute,
    paddingTop = 0,
    paddingBottom = 0,
    brandComponent = <Button className={classes.title}>brand</Button>,
    leftLinks,
    rightLinks,
    changeColorOnScroll,
  } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const headerColorChange = changeColorOnScroll
    ? createColorChange(changeColorOnScroll, classes, color)
    : null;
  const appBarClasses = clsx(classes.appBar, {
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });

  React.useEffect(() => {
    if (headerColorChange) {
      window.addEventListener("scroll", headerColorChange);
    }
    return () => {
      if (headerColorChange) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box pt={paddingTop || 0} pb={paddingBottom || 0}>
      <AppBar className={appBarClasses}>
        <Container maxWidth={maxWidth}>
          <Toolbar className={classes.container} disableGutters={true}>
            {leftLinks !== undefined ? brandComponent : null}
            <div className={classes.flex}>
              {leftLinks !== undefined ? (
                <Hidden smDown implementation="css">
                  {leftLinks}
                </Hidden>
              ) : (
                brandComponent
              )}
            </div>
            <Hidden smDown implementation="css">
              {rightLinks}
            </Hidden>
            <Hidden mdUp>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
              >
                <Menu />
              </IconButton>
            </Hidden>
          </Toolbar>
          <Hidden mdUp implementation="js">
            <Drawer
              variant="temporary"
              anchor={"right"}
              open={mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={handleDrawerToggle}
            >
              <div className={classes.appResponsive}>
                {leftLinks}
                {rightLinks}
              </div>
            </Drawer>
          </Hidden>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
