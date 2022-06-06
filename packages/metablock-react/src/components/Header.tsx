import Menu from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import React from "react";

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

const getColours = (
  colorChange: boolean,
  defaults: any,
  changed?: any
): Record<string, string> => {
  const colors = colorChange ? changed || defaults : defaults;
  return {
    color: colors.color,
    backgroundColor: `${colors.backgroundColor} !important`,
  };
};

const Header = (props: HeaderProps) => {
  const {
    color = "transparent",
    backgroundColor = "inherit",
    maxWidth = "lg",
    fixed,
    absolute,
    LeftLinks,
    RightLinks,
    changeColorOnScroll,
  } = props;
  const ref = React.useRef<any>();
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
  const [colorChange, setColorChange] = React.useState<boolean>(false);
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
    ...getColours(colorChange, { color, backgroundColor }, changeColorOnScroll),
  };
  if (absolute) sxAppBar = { ...sxAppBar, position: "absolute", zIndex: 1100 };
  else if (fixed) sxAppBar = { ...sxAppBar, position: "fixed", zIndex: 1100 };
  const { BrandComponent = () => <Button>brand</Button> } = props;

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

  const brand = <BrandComponent colorChange={colorChange} />;

  return (
    <AppBar ref={ref} sx={sxAppBar}>
      <Container maxWidth={maxWidth}>
        <Toolbar sx={{ width: "100%" }} disableGutters={true}>
          {LeftLinks ? brand : null}
          <Box sx={{ flex: 1 }}>
            {LeftLinks ? (
              <Hidden mdDown implementation="css">
                <LeftLinks colorChange={colorChange} />
              </Hidden>
            ) : (
              brand
            )}
          </Box>
          {RightLinks ? (
            <Hidden mdDown implementation="css">
              <RightLinks colorChange={colorChange} />
            </Hidden>
          ) : null}
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              size="large"
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
            onClose={handleDrawerToggle}
          >
            <Box
              sx={{
                margin: "20px 10px",
              }}
            >
              {LeftLinks ? <LeftLinks colorChange={colorChange} /> : null}
              {RightLinks ? <RightLinks colorChange={colorChange} /> : null}
            </Box>
          </Drawer>
        </Hidden>
      </Container>
    </AppBar>
  );
};

export default Header;
