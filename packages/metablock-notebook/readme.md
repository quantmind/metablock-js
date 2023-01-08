# Metablock Notebook

A library for

* rendering markdow, math, code
* editing
* executing code

## Usage

```js
import { Notebook } from "@metablock/notebook";
const el = document;
const markdown_text = `
# Title

This is an example notebook.
`;
const notebook = new Notebook();
notebook.render(markdown_text, el);
```
