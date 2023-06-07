import React from "react";
import { useImage } from "../hooks";

import Image from "./Image";

const UnsplashImage = (props: any) => {
  const { photoId, metablock, ...extra } = props;
  const { value } = useImage(photoId, metablock);
  const urls = value || [];
  return <Image urls={urls} {...extra} />;
};

export default UnsplashImage;
