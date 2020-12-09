import React from "react";
import { useAsync } from "react-use";
import { useStores } from "../../store";
import { isSsr } from "../NoSsr";
import UnsplashCredits from "../UnsplashCredits";
import Parallax from "./Parallax";
import ParallaxProps from "./props";

interface UnsplashProps extends ParallaxProps {
  photoId: string;
  credit: boolean;
}

const Unsplash = (props: UnsplashProps) => {
  const { photoId, credit, maxWidth, ...extra } = props;
  const { photoStore } = useStores();
  const { loading, value } = useAsync(async () => {
    if (isSsr()) return { urls: {} };
    else return await photoStore.getPhoto(photoId);
  }, [photoId]);
  let urls: string[] = [];
  if (!loading && value) {
    const d = value.urls;
    urls = [d.thumb, d.small, d.regular, d.full];
  }
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
