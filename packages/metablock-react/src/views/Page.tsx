import { getBlock, WebBlock } from "@metablock/core";
import React from "react";
import { Helmet } from "react-helmet";
import MetaImage from "./MetaImage";

function buildTitle(block: WebBlock, text: string, prefix: boolean) {
  if (text) return prefix ? `${block.title} - ${text}` : text;
  else return block.title;
}

function buildDescription(block: WebBlock, text: string) {
  if (text && text.length > 50) return text;
  else if (text) return `${text}. ${block.description}`;
  else return block.description;
}

interface PageProps {
  title?: string;
  prefix?: boolean;
  description?: string;
  keywords?: string;
  content?: string;
  twitter_card?: string;
  url?: string;
  image?: string;
  children: React.ReactNode;
  statusCode?: number;
  [x: string]: any;
}

const Page = (props: PageProps) => {
  const block = getBlock();
  const {
    title = "",
    children,
    image,
    keywords,
    twitter_card = "summary_large_image",
    content = "website",
    prefix = false,
    statusCode,
    description = "",
    url = window.location.href,
  } = props;
  return (
    <>
      <Helmet>
        <title>{buildTitle(block, title, prefix)}</title>
        <meta
          name="description"
          content={buildDescription(block, description)}
        />
        {keywords ? <meta name="keywords" content={keywords} /> : null}
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={title} />
        <meta property="og:type" content={content} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:card" content={twitter_card} />
        {statusCode ? (
          <meta name="page-status-code" content={`${statusCode}`} />
        ) : null}
      </Helmet>
      <MetaImage image={image} />
      {children}
    </>
  );
};

export default Page;
