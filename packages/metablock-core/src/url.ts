export type QueryType = Record<string, any>;

const urlQuery = (url: string, query: QueryType): string => {
  if (query) {
    const u = global.window
      ? new URL(url, global.window.location.origin)
      : new URL(url);
    Object.keys(query).forEach((key) => {
      let values = query[key];
      if (!Array.isArray(values)) values = [values];
      values.forEach((value: string) => {
        u.searchParams.append(key, value);
      });
    });
    url = u.toString();
  }
  return url;
};

export default urlQuery;
