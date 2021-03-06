const urlQuery = (url: string, query: any): string => {
  if (query) {
    const u = global.window
      ? new URL(url, global.window.location.origin)
      : new URL(url);
    Object.keys(query).forEach((key) => u.searchParams.set(key, query[key]));
    url = u.toString();
  }
  return url;
};

export default urlQuery;
