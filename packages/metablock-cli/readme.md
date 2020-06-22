# Metablock Client

A node client for interacting with metablock cloud.

## Deployments

To make deployment you need an access token with valid permissions, the ID of the block and the location of the bundle as environment variables.

1. These parameters can be setup as environment variables:

```
METABLOCK_BLOCK_ID=...
METABLOCK_API_TOKEN=...
BUNDLE_LOCATION=...
```

2. Alternatively, they can be passed to the command line script has the help in the command line will tell you

```
metablock ship --help
```
