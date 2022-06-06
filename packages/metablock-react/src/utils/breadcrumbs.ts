export interface Crumb {
  text: string;
  to?: string;
}

export const breadcrumbs = (...texts: string[]): Crumb[] => {
  const bits = location.pathname.split("/").filter((v: string) => v);
  const text =
    bits.length && texts.length
      ? bits.slice(0, -texts.length).concat(texts)
      : bits;
  let url = "";
  return bits.map((bit: string, index: number) => {
    const crumb: Crumb = { text: text[index] };
    if (index < bits.length - 1) {
      url = `${url}/${bit}`;
      crumb.to = url;
    }
    return crumb;
  });
};
