# [Metablock](https://Metablock.io/)

[![GitHub license](https://img.shields.io/badge/license-IOC-blue.svg)](https://github.com/quantmind/metablock-js/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/@metablock/core.svg?style=flat)](https://www.npmjs.com/package/@metablock/core)
[![build](https://github.com/quantmind/metablock-js/workflows/build/badge.svg)](https://github.com/quantmind/metablock-js/actions?query=workflow%3Abuild)
[![codecov](https://codecov.io/gh/quantmind/metablock-js/branch/main/graph/badge.svg?token=WNBTV2MFZP)](https://codecov.io/gh/quantmind/metablock-js)

Tooling for metablock cloud.

- [@metablock/core](./packages/metablock-core): a [Metablock API](https://api.metablock.io/v1/docs) client for both node and the browser.
- [@metablock/cli](./packages/metablock-cli): command line client for interacting with metablock API
- [@metablock/server](./packages/metablock-server): a dev server for HTML metablocks
- [@metablock/store](./packages/metablock-store): stores for metablock authentication plugin
- [@metablock/react](./packages/metablock-react): reusable react components
- [@metablock/notebook](./packages/metablock-notebook): experimental notebook app

## Release

To create a new release

- edit the version in the [package.json](package.json) file
- run `make version`, this will update the version in all the sub-packages
- run `yarn install` to update the lock file
- commit with the `Release <version>` message and push to main
- to force commit after a merge to main you can use
  ```
  git commit -m "Release <version>" --allow-empty
  ```
- the publish job will publish to npm and create a github tag

As of Aug 2023

```
make cloc
   28063 text files.
    1225 unique files.
   88908 files ignored.

github.com/AlDanial/cloc v 1.90  T=2.83 s (78.9 files/s, 3210.3 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                     195            833            109           7135
JSON                            14              0              0            332
Markdown                         7            125              0            279
JavaScript                       7             27              0            238
-------------------------------------------------------------------------------
SUM:                           223            985            109           7984
-------------------------------------------------------------------------------
```
