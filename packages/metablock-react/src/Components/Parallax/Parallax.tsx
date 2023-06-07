import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import React from "react";
import Image from "../Image";
import ParallaxProps from "./props";

const Parallax = (props: ParallaxProps) => {
  const {
    filter,
    opacity,
    children,
    small,
    theme,
    urls = [],
    maxHeight = "1000px",
    maxWidth = "md",
    minScrollWidth = 768,
    speed = 3,
  } = props;
  const windowScrollTop =
    window.innerWidth >= minScrollWidth ? window.pageYOffset / speed : 0;
  const [transform, setTransform] = React.useState(
    "translate3d(0," + windowScrollTop + "px,0)"
  );
  React.useEffect(() => {
    if (minScrollWidth > 0) {
      if (window.innerWidth >= minScrollWidth)
        window.addEventListener("scroll", resetTransform);
      return () => {
        if (window.innerWidth >= minScrollWidth) {
          window.removeEventListener("scroll", resetTransform);
        }
      };
    }
  });
  const resetTransform = () => {
    const windowScrollTop = window.pageYOffset / speed;
    setTransform("translate3d(0," + windowScrollTop + "px,0)");
  };

  const style: Record<string, string> = {};
  if (minScrollWidth > 0) style.transform = transform;

  const inner = (
    <Container maxWidth={maxWidth} sx={{ zIndex: 10 }}>
      {children}
    </Container>
  );
  const sxImage = {
    position: "relative",
    height: "90vh",
    overflow: "hidden",
    margin: "0",
    padding: "0",
    border: "0",
    display: "flex",
    alignItems: "center",
    "& img.image": {
      zIndex: 1,
      backgroundPosition: "center center",
      width: "100%",
      objectFit: "cover",
    },
    maxHeight: small ? "380px" : maxHeight,
  };
  const Filter = styled("div")({
    zIndex: 2,
    content: "''",
    backgroundColor: `rgba(0, 0, 0, ${filter || 0.5})`,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
  });
  return (
    <Image sx={sxImage} opacity={opacity} urls={urls} style={style}>
      {filter ? <Filter /> : null}
      {theme ? <ThemeProvider theme={theme}>{inner}</ThemeProvider> : inner}
    </Image>
  );
};
export default Parallax;
