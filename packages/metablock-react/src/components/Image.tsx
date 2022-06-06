import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import React from "react";
import { useIntersectionObserver, useWindowSize } from "../hooks";

const styledImage = (image: ImageEntry, opacity: number, fit: string) => {
  let styling: Record<string, any> = {
    position: "absolute",
    top: 0,
    left: 0,
  };
  if (fit === "height") styling = { height: "100%", ...styling };
  else if (fit === "width") styling = { width: "100%", ...styling };
  if (image.size === 0)
    styling = {
      filter: "blur(20px)",
      transform: "scale(1.1)",
      transition: "visibility 0ms ease 400ms",
      visibility: "visible",
      ...styling,
    };
  else
    styling = { transition: "opacity 400ms ease 0ms", opacity: 0, ...styling };
  if (image.loaded) styling[opacity] = opacity;
  return styled("img")(styling);
};

interface ImageEntry {
  size: number;
  loaded: boolean;
}

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
    fit = "height",
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
    images.push(createImage(currentSize));
    if (draws) render(draws + 1);
  }, [currentImage.size < currentSize]);

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
    entries = images.map((image) => {
      const StyledImage = styledImage(image, opacity, fit);
      return (
        <StyledImage
          key={image.size}
          onLoad={() => {
            image.loaded = true;
            //render(draws + 1);
          }}
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
      );
    });
  }
  return (
    <Box ref={ref} {...boxProps}>
      {entries}
      {children}
    </Box>
  );
};

export default Image;
