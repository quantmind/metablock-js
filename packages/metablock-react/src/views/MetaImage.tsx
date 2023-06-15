import React from "react";
import { Helmet } from "react-helmet";
import { useImage } from "../hooks";

const MetaImage = ({ image }: { image?: string }) => {
  const { urls } = useImage(image || "");
  if (!urls.length) return null;
  const url = urls[0];
  return (
    <Helmet>
      <meta property="og:image" content={url} />
      <meta property="twitter:image" content={url} />
    </Helmet>
  );
};

export default MetaImage;
