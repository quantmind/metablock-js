const config: Record<string, any> = {
  MARKED: "marked@v4.2.12",
  PURIFY: "dompurify@2.0.12/dist/purify.min.js",
  HL_ROOT: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0",
  HL_CSS: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles",
  KATEX: "https://cdn.jsdelivr.net/npm/katex@0.16.0",
  CODEMIRROR: "https://cdn.skypack.dev/@codemirror",
  OKTOKIT: "https://cdn.skypack.dev/octokit",
  defaultHighlightStyle: {
    light: "github",
    dark: "base16/classic-dark",
  },
};

export default config;
