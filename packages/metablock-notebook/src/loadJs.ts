const LoadPromises: Record<string, Promise<void>> = {};

const loadJs = (src: string) => {
  if (!LoadPromises[src]) {
    LoadPromises[src] = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onerror = reject;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }
  return LoadPromises[src];
};

export default loadJs;
