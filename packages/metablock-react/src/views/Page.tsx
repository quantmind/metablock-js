import { Block } from "@metablock/core";
import React from "react";
import { Helmet } from "react-helmet";
import { useBlock } from "../dom";

function buildTitle(block: Block, text: string, prefix: boolean) {
  if (text) return prefix ? `${block.title} - ${text}` : text;
  else return block.title;
}

function buildDescription(block: Block, text: string) {
  if (text && text.length > 50) return text;
  else if (text) return `${text}. ${block.description}`;
  else return block.description;
}

interface PageProps {
  title?: string;
  prefix?: boolean;
  description?: string;
  url?: string;
  children: React.ReactNode;
}

const Page = (props: PageProps) => {
  const block = useBlock();
  const {
    title = "",
    children,
    prefix = true,
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
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
      </Helmet>
      {children}
    </>
  );
};

export default Page;
