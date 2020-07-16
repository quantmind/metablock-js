export default {
  MARKED: "marked@1.1.0",
  PURIFY: "dompurify@2.0.12/dist/purify.min.js",
  HL_ROOT: "https://cdn.jsdelivr.net/npm/@observablehq/highlight.js@2.0.0",
  HL_CSS: "https://cdn.jsdelivr.net/npm/highlightjs@9.16.2/styles",
  KATEX: "https://cdn.jsdelivr.net/npm/katex@0.11.1",
  CODEMIRROR: "https://cdn.jsdelivr.net/npm/codemirror@5.55.0",
  defaultHighlightStyle: "default",
};

export interface Library {
  require: any;
  loadStyle: (stylesheet: string) => Promise<void>;
  resolvers: any[];
}
