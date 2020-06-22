const METABLOCK_BLOCK_ID = process.env.METABLOCK_BLOCK_ID;
const METABLOCK_API_TOKEN = process.env.METABLOCK_API_TOKEN;
const METABLOCK_API_URL =
  process.env.METABLOCK_API_URL || "https://api.metablock.io";
const BUNDLE_LOCATION = process.env.BUNDLE_LOCATION || "./dist";
const METABLOCK_ENV = process.env.METABLOCK_ENV || "stage";
const GIT_SHA = process.env.GIT_SHA || process.env.GITHUB_SHA;

export default {
  METABLOCK_BLOCK_ID,
  METABLOCK_API_TOKEN,
  METABLOCK_API_URL,
  METABLOCK_ENV,
  BUNDLE_LOCATION,
  GIT_SHA,
};
