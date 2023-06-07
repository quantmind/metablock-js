const getWindow = () => {
  try {
    return window;
  } catch {
    return undefined;
  }
};

export default getWindow;
