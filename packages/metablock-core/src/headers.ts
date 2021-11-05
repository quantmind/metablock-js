export const parseLinkHeader = (linkHeader: string): Record<string, string> => {
  if (!linkHeader) return {};
  return linkHeader
    .split(/,\s*</)
    .map(parseLink)
    .filter((x: any) => x && x.rel)
    .reduce((acc: Record<string, string>, x: any) => {
      x.rel.split(/\s+/).forEach((rel: string) => {
        acc[rel] = x.url;
      });
      return acc;
    }, {});
};

const parseLink = (link: string): Record<string, string> | void => {
  const m = link.match(/<?([^>]*)>(.*)/);
  if (m) {
    const parts = m[2].split(";");
    const url = new URL(m[1]);
    parts.shift();
    return parts.reduce(
      (acc: any, p: string) => {
        const m = p.match(/\s*(.+)\s*=\s*"?([^"]+)"?/);
        if (m) acc[m[1]] = m[2];
        return acc;
      },
      { url: url.toString() }
    );
  }
};
