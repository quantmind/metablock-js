import React from "react";
import { useImage } from "../hooks";

import Image from "./Image";

const ImageStore = (props: any) => {
  const { image, metablock, ...extra } = props;
  const { urls } = useImage(image, metablock);
  return <Image urls={urls} {...extra} />;
};

export default ImageStore;
