import { assetUrl, bundleUrl, getBlock, liveUrl } from "@metablock/core";
import { timeFormat as d3TimeFormat } from "d3-time-format";
import { CmsListData } from "./interfaces";

const substitutes: Record<string, string> = {
  "{{ assetUrl }}": assetUrl(""),
  "{{ bundleUrl }}": bundleUrl(""),
  "{{ liveUrl }}": liveUrl(""),
};

export const slugValues = (entry: CmsListData): Record<string, string> => {
  const date =
    typeof entry.date === "string" && entry.date
      ? new Date(entry.date)
      : entry.date;
  entry.date = date;
  return date
    ? {
        yyyy: "" + (date as Date).getFullYear(),
        mm: "" + (date as Date).getMonth(),
        slug: entry.slug,
      }
    : { slug: entry.slug };
};

export const urlPath = (entry: CmsListData, slug: string[]) => {
  const values = slugValues(entry);
  return slug.map((s: string) => values[s]).join("/");
};

export const matchSlug = (
  entry: CmsListData,
  slug: string[],
  params: Record<string, any>
) => {
  const values = slugValues(entry);
  return (
    slug.filter((s: string) => params[s] === values[s]).length === slug.length
  );
};

export const dateFormat = () => {
  return d3TimeFormat(getBlock().date_format);
};

const renderTypes = new Set([String, Array]);

export const render = (entry: Record<string, any>): Record<string, any> => {
  if (entry._cms_rendered) return entry;
  return Object.keys(entry).reduce(
    (newEntry: Record<string, any>, key: string) => {
      let value = entry[key];
      if (value && renderTypes.has(value.constructor)) {
        let single = false;
        if (value.constructor !== Array) {
          value = [value];
          single = true;
        }
        value = value.map((v: string) => {
          Object.keys(substitutes).forEach((key) => {
            v = v.split(key).join(substitutes[key]);
          });
          return v;
        });
        value = single ? value[0] : value;
      }
      newEntry[key] = value;
      return newEntry;
    },
    { _cms_rendered: true }
  );
};
