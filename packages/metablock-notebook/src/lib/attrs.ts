export default (dom: Element): Record<string, any> => {
  return dom
    .getAttributeNames()
    .reduce((o: Record<string, any>, name: string) => {
      o[name] = dom.getAttribute(name);
      return o;
    }, {});
};
