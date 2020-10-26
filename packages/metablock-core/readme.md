# Metablock Core

Core tooling for metablock applications. It includes a client for [metablock Rest API](https://api.metablock.io/v1/docs).

## Metablock Client

```javascript
import { Metablock } from "@metablock/core";

cli = new Metablock({ token: "" });
cli.user.getUser();
```

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
