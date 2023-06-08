import React from "react";
import { useImage } from "../hooks";

import Image from "./Image";

const ImageStore = (props: any) => {
  const { photoId, metablock, ...extra } = props;
  const { value } = useImage(photoId, metablock);
  const urls = value || [];
  return <Image urls={urls} {...extra} />;
};

export default ImageStore;
