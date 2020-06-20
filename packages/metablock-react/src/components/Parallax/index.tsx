import clsx from "clsx";
import React from "react";
import useStyles from "../Parallax/styles";

interface ParallaxProps {
  className?: string;
  children: React.ReactNode;
  image?: string;
  filter?: number;
  small?: boolean;
}

const Parallax = (props: ParallaxProps) => {
  let windowScrollTop;
  if (window.innerWidth >= 768) {
    windowScrollTop = window.pageYOffset / 3;
  } else {
    windowScrollTop = 0;
  }
  const [transform, setTransform] = React.useState(
    "translate3d(0," + windowScrollTop + "px,0)"
  );
  React.useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener("scroll", resetTransform);
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform);
      }
    };
  });
  const resetTransform = () => {
    const windowScrollTop = window.pageYOffset / 3;
    setTransform("translate3d(0," + windowScrollTop + "px,0)");
  };

  const { filter, className = "", children, image = "", small } = props;
  const classes = useStyles({
    filter,
    image,
  });
  const parallaxClasses = clsx({
    [classes.parallax]: true,
    [classes.filter]: filter ? true : false,
    [classes.small]: small,
    [className]: className,
  });
  const style: Record<string, string> = { transform };

  return (
    <div className={parallaxClasses} style={style}>
      <div className={classes.relative}>{children}</div>
    </div>
  );
};

export default Parallax;
