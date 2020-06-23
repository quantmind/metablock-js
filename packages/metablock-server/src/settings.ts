import fetch from "cross-fetch";

global.fetch = fetch as any;

const METABLOCK_API_URL =
  process.env.METABLOCK_API_URL || "https://api.metablock.io";
const METABLOCK_WEB_URL = process.env.METABLOCK_WEB_URL || "";
const METABLOCK_API_KEY = process.env.METABLOCK_API_KEY || "apiKey";
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || "";
const UNSPLASH_SECRET_KEY = process.env.UNSPLASH_SECRET_KEY || "";

export default {
  METABLOCK_API_URL,
  METABLOCK_API_KEY,
  METABLOCK_WEB_URL,
  UNSPLASH_ACCESS_KEY,
  UNSPLASH_SECRET_KEY,
};
