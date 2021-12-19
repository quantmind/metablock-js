# [Metablock](https://Metablock.io/) &middot; [![GitHub license](https://img.shields.io/badge/license-IOC-blue.svg)](https://github.com/quantmind/metablock-js/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/@metablock/core.svg?style=flat)](https://www.npmjs.com/package/@metablock/core) [![build](https://github.com/quantmind/metablock-js/workflows/build/badge.svg)](https://github.com/quantmind/metablock-js/actions?query=workflow%3Abuild) [![codecov](https://codecov.io/gh/quantmind/metablock-js/branch/master/graph/badge.svg)](https://codecov.io/gh/quantmind/metablock-js)

Tooling for metablock cloud.

- [@metablock/core](./packages/metablock-core): a Metablock client for both node and the browser.
- [@metablock/cli](./packages/metablock-cli): command line client for interacting with metablock API.
- [@metablock/server](./packages/metablock-server): a dev server for metablocks.
- [@metablock/store](./packages/metablock-store): stores for metablock authentication plugin.
- [@metablock/react](./packages/metablock-react): Reusable React components.
- [@metablock/cms](./packages/metablock-cms): A lightweight CMS
- [@metablock/notebook](./packages/metablock-notebook): Experimental notebook app

## Release

To create a new release

- edit the version in the [package.json](package.json) file
- run `make version`, this will update the version in all the sub-packages
- run `yarn install` to update the lock file
- commit with the `Release <version>` message and push to master
- to force commit after a merge to master you can use
  ```
  git commit -m "Release <version>" --allow-empty
  ```
- The publish job will publish to npm and create a github tag
