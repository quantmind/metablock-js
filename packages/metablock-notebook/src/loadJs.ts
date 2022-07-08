const loadJs = (src: string) => {
  return new Promise((resolve, reject) => {
    const script = document.querySelector(`script[src="${src}"]`);
    if (script) resolve(null);
    else {
      const script = document.createElement("script");
      script.src = src;
      script.onerror = reject;
      script.onload = resolve;
      document.head.appendChild(script);
    }
  });
};

export default loadJs;
