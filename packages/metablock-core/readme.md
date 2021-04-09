# Metablock Core

Core tooling for metablock applications

- Lightweight with no dependencies
- Includes a client for [metablock Rest API](https://api.metablock.io/v1/docs).

## Metablock API Client

```javascript
import { Metablock } from "@metablock/core";

const cli = new Metablock({ token: "" });
const user = await cli.user.getUser();
```

### Organizations

The metablock client access the organizations endpoints via [cli.orgs](./src/cli/orgs.ts) component.
Check the [org REST docs](https://api.metablock.io/v1/docs#tag/Organizations) for more detailed information.

### Spaces

The metablock client access the organizations endpoints via [cli.spaces](./src/cli/spaces.ts) component.
Check the [space REST docs](https://api.metablock.io/v1/docs#tag/Spaces) for more detailed information.

### Blocks

The metablock client access the organizations endpoints via [cli.blocks](./src/cli/blocks.ts) component.
Check the [block REST docs](https://api.metablock.io/v1/docs#tag/Services) for more detailed information.

## Tools

### Urls

Easily create urls for your block.

1. `assetUrl` for the asset uploaded in the block storage
1. `deployUrl` for the current live deployment with sha key
1. `liveUrl` point to same assets as `deployUrl` but without the sha (url does not change across deployment)

Use with a relative path

```javascript
import { liveUrl } from "@metablock/core";
const url = liveUrl("icons/myicon.svg");
```

### Logger

A simple logger utility for node and the browser

```javascript
import { getLogger } from "@metablock/core";

const logger = getLogger();
logger.debug("Hi!");
logger.info("Hi!"); // Hi!

const logger2 = getLogger({ level: "debug" });
logger2.debug("Hi!"); // Hi!

const child = logger.child("test");
child.info("Hi!"); // test Hi!
```

### compileOptions(text)

From a text of the form:

```
entry1: balabla
entry2: another entry
...
```

return a Object with corresponding key value pairs.
