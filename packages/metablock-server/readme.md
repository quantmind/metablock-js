# A dev server for metablock

Install via

```bash
yarn add @metablock/server
```

and use it with webpack

```javascript
import { devServer } from "@metablock/server";

const webPackConfig = {
  devServer: devServer("https://myblock.mblock.sh", { hot: true }),
  ...
};
```
