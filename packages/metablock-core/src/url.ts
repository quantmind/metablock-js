const urlQuery = (url: string, query: any): string => {
  if (query) {
    const base = window ? window.location.origin : "";
    const u = new URL(url, base);
    Object.keys(query).forEach((key) => u.searchParams.set(key, query[key]));
    url = u.toString();
  }
  return url;
};

export default urlQuery;
