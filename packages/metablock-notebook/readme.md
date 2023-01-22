# Metablock Notebook

 [![npm version](https://img.shields.io/npm/v/@metablock/notebook.svg?style=flat)](https://www.npmjs.com/package/@metablock/notebook)

A library for rendering markdown, math, code, editing, executing code inline, and much more!

## Usage

```js
import { Notebook } from "@metablock/notebook";
const el = document.querySelector("body");
const markdown_text = `
# Title

This is an example notebook.
`;
const notebook = new Notebook();
notebook.render(markdown_text, el);
```
