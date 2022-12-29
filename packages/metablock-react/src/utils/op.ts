import { getBlock } from "@metablock/core";
import * as d3 from "d3-time-format";

export const dateFormat = () => {
  return d3.timeFormat(getBlock().date_format);
};
