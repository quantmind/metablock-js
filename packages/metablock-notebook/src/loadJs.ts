const LoadPromises: Record<string, Promise<void>> = {};

const loadJs = (src: string, attrs?: Record<string, any>) => {
  if (!LoadPromises[src]) {
    LoadPromises[src] = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      const attributes = attrs || {};
      Object.keys(attributes).forEach((key) => {
        script.setAttribute(key, attributes[key]);
      });
      script.onerror = reject;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }
  return LoadPromises[src];
};

export default loadJs;
