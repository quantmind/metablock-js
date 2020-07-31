# Metablock Core

Core tooling for metablock applications. It includes a client for [metablock Rest API](https://api.metablock.io/v1/docs).

## Metablock Client

```javascript
import { Metablock } from "@metablock/core";

cli = new Metablock({ token: "" });
cli.users.getUser();
```

## Tools

### compileOptions(text)

From a text of the form:

```
entry1: balabla
entry2: another entry
...
```

return a Object with corresponding key value pairs.
