import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { MenuIcon } from "../Icons";

interface HeaderComponentProps {
  colorChange: boolean;
  mobileOpen: boolean;
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
  hideSize?: string;
  changeColorOnScroll?: {
    height: number;
    color: string;
    backgroundColor: string;
  };
}

const getColours = (
  colorChange: boolean,
  defaults: any,
  changed?: any
): Record<string, any> => {
  return colorChange ? changed || defaults : defaults;
};

const Header = (props: HeaderProps) => {
  const {
    color = "inherit",
    backgroundColor = "inherit",
    maxWidth = "lg",
    fixed,
    absolute,
    LeftLinks,
    RightLinks,
    changeColorOnScroll,
    hideSize = "md",
  } = props;
  const ref = React.useRef<any>();
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
  const [colorChange, setColorChange] = React.useState<boolean>(false);
  const colors = getColours(
    colorChange,
    { color, backgroundColor },
    changeColorOnScroll
  );
  let sxAppBar: Record<string, any> = {
    display: "flex",
    border: "0",
    width: "100%",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    position: "relative",
    zIndex: "unset",
    boxShadow: "none",
    color: colors.color,
  };
  if (absolute) sxAppBar = { ...sxAppBar, position: "absolute", zIndex: 1100 };
  else if (fixed) sxAppBar = { ...sxAppBar, position: "fixed", zIndex: 1100 };
  const { BrandComponent = () => <Button>brand</Button> } = props;
  const hiddenProps: any = { implementation: "css" };
  hiddenProps[`${hideSize}Down`] = true;

  React.useEffect(() => {
    if (!changeColorOnScroll) return;

    const headerColorChange = () => {
      const windowsScrollTop = window.pageYOffset;
      if (windowsScrollTop > changeColorOnScroll.height) {
        setColorChange(true);
      } else {
        setColorChange(false);
      }
    };
    window.addEventListener("scroll", headerColorChange);
    return () => {
      window.removeEventListener("scroll", headerColorChange);
    };
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const brand = (
    <BrandComponent colorChange={colorChange} mobileOpen={mobileOpen} />
  );

  return (
    <AppBar ref={ref} sx={sxAppBar} color={colors.backgroundColor}>
      <Container maxWidth={maxWidth}>
        <Toolbar sx={{ width: "100%" }} disableGutters={true}>
          {LeftLinks ? brand : null}
          <Typography sx={{ flex: 1 }} color={colors.color} component="div">
            {LeftLinks ? (
              <Hidden {...hiddenProps}>
                <LeftLinks colorChange={colorChange} mobileOpen={mobileOpen} />
              </Hidden>
            ) : (
              brand
            )}
          </Typography>
          {RightLinks ? (
            <Hidden {...hiddenProps}>
              <Typography color={colors.color} component="div">
                <RightLinks colorChange={colorChange} mobileOpen={mobileOpen} />
              </Typography>
            </Hidden>
          ) : null}
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
        <Hidden mdUp implementation="js">
          <Drawer
            variant="temporary"
            anchor={"right"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
          >
            <Typography
              color={colors.color}
              sx={{
                margin: "20px 10px",
              }}
            >
              {LeftLinks ? (
                <LeftLinks colorChange={colorChange} mobileOpen={true} />
              ) : null}
              {RightLinks ? (
                <RightLinks colorChange={colorChange} mobileOpen={true} />
              ) : null}
            </Typography>
          </Drawer>
        </Hidden>
      </Container>
    </AppBar>
  );
};

export default Header;
