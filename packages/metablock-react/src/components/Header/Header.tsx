import AppBar from "@material-ui/core/AppBar";
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

interface HeaderComponentProps {
  colorChange: boolean;
}

export interface HeaderProps {
  color?: string;
  backgroundColor?: string;
  fixed?: boolean;
  absolute?: boolean;
  maxWidth?: any;
  BrandComponent?: React.FC<HeaderComponentProps>;
  LeftLinks?: React.FC<HeaderComponentProps>;
  RightLinks?: React.FC<HeaderComponentProps>;
  paddingTop?: number;
  paddingBottom?: number;
  changeColorOnScroll?: {
    height: number;
    color: string;
    backgroundColor: string;
  };
}

const Header = (props: HeaderProps) => {
  const {
    color = "transparent",
    backgroundColor = "inherit",
    maxWidth = "lg",
    fixed,
    absolute,
    paddingTop = 0,
    paddingBottom = 0,
    LeftLinks,
    RightLinks,
    changeColorOnScroll,
  } = props;
  const classes: Record<string, any> = useStyles({
    paddingTop,
    paddingBottom,
    backgroundColor,
    color,
    changeColorOnScroll,
  });
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
  const [colorChange, setColorChange] = React.useState<boolean>(false);
  const headerColorChange = changeColorOnScroll
    ? createColorChange(changeColorOnScroll, classes, color, setColorChange)
    : null;
  const appBarClasses = clsx(classes.appBar, classes.defaultColor, {
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });
  const {
    BrandComponent = () => <Button className={classes.title}>brand</Button>,
  } = props;

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

  const brand = <BrandComponent colorChange={colorChange} />;

  return (
    <AppBar color="transparent" className={appBarClasses}>
      <Container maxWidth={maxWidth}>
        <Toolbar className={classes.container} disableGutters={true}>
          {LeftLinks ? brand : null}
          <div className={classes.flex}>
            {LeftLinks ? (
              <Hidden smDown implementation="css">
                <LeftLinks colorChange={colorChange} />
              </Hidden>
            ) : (
              brand
            )}
          </div>
          {RightLinks ? (
            <Hidden smDown implementation="css">
              <RightLinks colorChange={colorChange} />
            </Hidden>
          ) : null}
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
              {LeftLinks ? <LeftLinks colorChange={colorChange} /> : null}
              {RightLinks ? <RightLinks colorChange={colorChange} /> : null}
            </div>
          </Drawer>
        </Hidden>
      </Container>
    </AppBar>
  );
};

export default Header;
