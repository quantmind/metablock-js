import React from "react";
import { useAsync } from "react-use";
import { useStores } from "../store";
import Image from "./Image";
import { isSsr } from "./NoSsr";

const UnsplashImage = (props: any) => {
  const { photoId, ...extra } = props;
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
  return <Image urls={urls} {...extra} />;
};

export default UnsplashImage;
