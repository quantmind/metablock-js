export default (data: Record<string, any>, key: string): any => {
  const value = data[key];
  delete data[key];
  return value;
};
