import { Metablock } from "@metablock/core";
import React from "react";
import { useImage } from "../../hooks";
import UnsplashCredits from "../UnsplashCredits";
import Parallax from "./Parallax";
import ParallaxProps from "./props";

interface UnsplashProps extends ParallaxProps {
  photoId: string;
  credit: boolean;
  metablock?: Metablock;
}

const Unsplash = (props: UnsplashProps) => {
  const { photoId, credit, maxWidth, metablock, ...extra } = props;
  const { urls, ...info } = useImage(`unsplash-${photoId}`, metablock);
  return (
    <>
      <Parallax urls={urls} maxWidth={maxWidth} {...extra} />
      {credit && urls.length ? (
        <UnsplashCredits {...info} maxWidth={maxWidth} />
      ) : null}
    </>
  );
};

export default Unsplash;
