# Metablock Core

Core tooling for metablock applications. It includes a client for [metablock Rest API](https://api.metablock.io/v1/docs).

## Metablock Client

```javascript
import { Metablock } from "@metablock/core";

cli = new Metablock({ token: "" });
cli.user.getUser();
```

## Tools

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
