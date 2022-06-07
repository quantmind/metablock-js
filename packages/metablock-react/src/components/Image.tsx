import Box from "@mui/material/Box";
import React from "react";
import { useIntersectionObserver, useWindowSize } from "../hooks";

interface ImageEntry {
  size: number;
  loaded: boolean;
}

const imageSx = (
  image: ImageEntry,
  opacity: number,
  fit: string,
  current: number
) => {
  let sx: Record<string, any> = {
    position: "absolute",
    top: 0,
    left: 0,
  };
  if (fit === "height") sx = { height: "100%", ...sx };
  else if (fit === "width") sx = { width: "100%", ...sx };
  else {
    sx = {
      height: "100%",
      width: "100%",
      backgroundPosition: "center center",
      objectFit: "cover",
      ...sx,
    };
  }
  if (image.size === 0)
    sx = {
      ...sx,
      filter: "blur(20px)",
      transform: "scale(1.1)",
      transition: "visibility 0ms ease 400ms",
      visibility: "visible",
    };
  else
    sx = {
      ...sx,
      transition: "opacity 400ms ease 0ms",
      opacity: 0,
      visibility: current > image.size ? "hidden" : "visible",
    };
  if (image.loaded) sx = { ...sx, opacity };
  return sx;
};

interface ImageProps {
  alt?: string;
  opacity?: number;
  fit?: string;
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
    alt = "image",
    fit = "cover",
    opacity = 1,
    selectImage = defaultSelectImage,
    urls,
    onIsVisible,
    children,
    ...boxProps
  } = props;
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
  React.useEffect(() => {
    if (currentImage.size < currentSize) {
      images.push(createImage(currentSize));
      if (draws) render(draws + 1);
    }
  }, [currentImage.size, currentSize]);

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
      <Box
        component="img"
        sx={imageSx(image, opacity, fit, current)}
        key={image.size}
        onLoad={() => {
          if (!image.loaded) {
            image.loaded = true;
            render(draws + 1);
          }
        }}
        alt={alt}
        src={urls[image.size]}
      />
    ));
  }
  return (
    <Box ref={ref} {...boxProps}>
      {entries}
      {children}
    </Box>
  );
};

export default Image;
