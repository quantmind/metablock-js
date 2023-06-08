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
  const { value } = useImage(`unsplash-${photoId}`, metablock);
  const urls = value || [];
  return (
    <>
      <Parallax urls={urls} maxWidth={maxWidth} {...extra} />
      {credit && value ? (
        <UnsplashCredits {...value} maxWidth={maxWidth} />
      ) : null}
    </>
  );
};

export default Unsplash;
