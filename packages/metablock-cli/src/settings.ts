const METABLOCK_SERVICE_ID = process.env.METABLOCK_SERVICE_ID;
const METABLOCK_API_TOKEN = process.env.METABLOCK_API_TOKEN;
const METABLOCK_API_URL =
  process.env.METABLOCK_API_URL || "https://api.metablock.io";
const BUNDLE_LOCATION = process.env.BUNDLE_LOCATION || "./dist";

export default {
  METABLOCK_SERVICE_ID,
  METABLOCK_API_TOKEN,
  METABLOCK_API_URL,
  BUNDLE_LOCATION,
};
