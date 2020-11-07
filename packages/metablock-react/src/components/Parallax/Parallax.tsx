import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import Image from "../Image";
import ParallaxProps from "./props";
import useStyles from "./styles";

const Parallax = (props: ParallaxProps) => {
  const {
    filter,
    opacity,
    className = "",
    children,
    small,
    theme,
    urls = [],
    maxHeight = "1000px",
    maxWidth = "md",
    minScrollWidth = 768,
    speed = 3,
  } = props;
  const classes = useStyles({
    filter,
    maxHeight,
  });
  const parallaxClasses = clsx({
    [classes.parallax]: true,
    [classes.small]: small,
    [className]: className,
  });
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
    <Container maxWidth={maxWidth} className={classes.main}>
      {children}
    </Container>
  );
  return (
    <Image
      className={parallaxClasses}
      opacity={opacity}
      urls={urls}
      style={style}
    >
      {filter ? <div className={classes.over}></div> : null}
      {theme ? <ThemeProvider theme={theme}>{inner}</ThemeProvider> : inner}
    </Image>
  );
};
export default Parallax;
