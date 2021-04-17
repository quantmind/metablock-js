# A dev server for metablock

This package allow to serve meta-blocks during development.
To use it install these two dependencies

```bash
yarn add @metablock/server webpack-require-from --dev
```

and use it with webpack

```javascript
import RequireFrom from "webpack-require-from";
import { devServer } from "@metablock/server";

const webPackConfig = {
  devServer: devServer("https://myblock.mblock.sh", { hot: true }),
  plugins: [
    new RequireFrom({
      variableName: "__bundle_url__",
    }),
  ],
};
```

The additional options for the server are

- **ssr** to enable server side rendering via [puppeteer](https://github.com/puppeteer/puppeteer)
- **slowMo** to slow down puppeteer operations by the specified amount of milliseconds (this will set `headless` option to `false` so you can see what the server side browser is doing). Only used when **mode**=`development`.
- **docker** to signal the server is running inside a docker container
- **ssrPlugins** additional plugins for customizing SSR

For example, using SSR in dev mode:

```javascript
import { devServer, statusCode } from "@metablock/server";

const webPackConfig = {
  mode: "development",
  devServer: devServer("https://myblock.mblock.sh", {
    ssr: true,
    slowMo: 250,
    ssrPlugins: [statusCode],
    hot: true
  })
};
```
