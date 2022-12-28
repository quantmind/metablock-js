# A dev server for metablock

This package allow to serve metablocks during development.
```bash
yarn add @metablock/server --dev
```

To enable SSR (server side rendering) via [puppeteer](https://github.com/puppeteer/puppeteer) you may need to
```
apt install libcairo2 libpango-1.0-0 libxkbcommon-x11-0 libgbm-dev libatk-bridge2.0-0 libcups2 libnss3
```

## Use with webpack

To use it install this additional dev dependency

```bash
yarn add webpack-require-from --dev
```

and use it with `webpack.config.js`

```javascript
import RequireFrom from "webpack-require-from";
import { devServer } from "@metablock/server";

const PWD = process.cwd();
const resolvePath = (relativePath) => path.resolve(PWD, relativePath);


const STATIC_PATH = "/dist/";

const webPackConfig = {
  devServer: devServer("https://myblock.mblock.me", {
    ssr: true,
    hot: true,
    ssrPlugins: [statusCode],
    static: {
      directory: resolvePath(`.${STATIC_PATH}`),
      publicPath: STATIC_PATH,
    },
  }),
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
