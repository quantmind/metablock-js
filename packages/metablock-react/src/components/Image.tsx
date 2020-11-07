import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import { useIntersectionObserver, useWindowSize } from "../hooks";

const useStyles = makeStyles(() => ({
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
  },
  opacity: (props: any) => ({
    opacity: props.opacity,
  }),
  full: {
    transition: "opacity 400ms ease 0ms",
    opacity: 0,
  },
  thumb: {
    filter: "blur(20px)",
    transform: "scale(1.1)",
    transition: "visibility 0ms ease 400ms",
    visibility: "visible",
  },
}));

interface ImageEntry {
  size: number;
  loaded: boolean;
}

interface ImageProps {
  container?: string;
  alt?: string;
  opacity?: number;
  className?: string;
  onIsVisible?: () => void;
  selectImage?: (urls: string[], width: number | undefined) => number;
  urls: string[];
  children?: React.ReactNode;
  [x: string]: any;
}

const defaultSelectImage = (
  urls: string[],
  width: number | undefined
): number => {
  if (!width) return 0;
  if (width < 400) return 1;
  else if (width < 800) return 2;
  else return 3;
};

// urls returned should be in the form of an array of increased size
const Image = (props: ImageProps) => {
  const {
    container = "div",
    alt = "image",
    opacity = 1,
    selectImage = defaultSelectImage,
    urls,
    className,
    onIsVisible,
    children,
    ...extra
  } = props;
  const classes = useStyles({ opacity });
  const getClasses = (image: ImageEntry) =>
    clsx({
      [classes.image]: true,
      [classes.thumb]: image.size === 0,
      [classes.full]: image.size >= 1,
      [classes.opacity]: image.loaded,
      image: true,
    });
  const createImage = (size: number): ImageEntry => ({
    size,
    loaded: false,
  });
  const ref = React.useRef();
  const [draws, render] = React.useState(0);
  const isVisible = React.useRef(false);
  const imagesRef = React.useRef([createImage(0)]);
  const images = imagesRef.current as ImageEntry[];
  const currentImage = images[images.length - 1];
  const currentSize = useWindowSize((windowSize: any) => {
    const size = selectImage(urls, windowSize.width);
    return Math.max(size, currentImage.size);
  });

  // check if we need to load a new image
  if (currentImage.size < currentSize) {
    images.push(createImage(currentSize));
    if (draws) render(draws + 1);
  }

  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }]: Array<any>, observerElement: any) => {
      if (isIntersecting) {
        if (!isVisible.current) {
          if (onIsVisible) onIsVisible();
          isVisible.current = true;
          render(draws + 1);
        }
        observerElement.unobserve(ref.current);
      }
    },
  });

  let entries: any[] = [];
  if (urls.length && currentSize && isVisible.current) {
    // get the current image loaded
    let current = -1;
    for (let i = images.length - 1; i >= 0; --i) {
      if (images[i].loaded) {
        current = images[i].size;
        break;
      }
    }
    entries = images.map((image) => (
      <img
        key={image.size}
        onLoad={() => {
          image.loaded = true;
          render(draws + 1);
        }}
        className={getClasses(image)}
        style={
          image.size
            ? {}
            : {
                visibility: current > image.size ? "hidden" : "visible",
              }
        }
        alt={alt}
        src={urls[image.size]}
      />
    ));
  }
  return React.createElement(
    container,
    { className, ref, ...extra },
    entries.concat(children)
  );
};

export default Image;
