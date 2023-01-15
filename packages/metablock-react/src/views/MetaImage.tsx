import React from "react";
import { Helmet } from "react-helmet";
import { useImage } from "../hooks";

const MetaImage = ({ image }: { image?: string }) => {
  const { loading, value } = useImage(image || "");
  if (loading) return null;
  if (!value) return null;
  const url = value[1];
  return (
    <Helmet>
      <meta property="og:image" content={url} />
      <meta property="twitter:image" content={url} />
    </Helmet>
  );
};


export default MetaImage;
