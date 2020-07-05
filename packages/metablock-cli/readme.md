# Metablock Client

A command line client for

- Interacting with [metablock cloud](https://metablock.io/) (make deployments)
- Compile content/sitemap from repositories

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

## Compile Content

The `compile` command scans the repository for directories containing the `collection.json` file and

* Compile Markdown files into JSON data files and compile minimal requirement javascript files for inclusion in [@metablock/notebooks](https://github.com/quantmind/metablock-js/tree/master/packages/metablock-notebook)

The `collection.json` must include the

```json
  "content": true,
```

entry otherwise the directory won't be considered as content (however subdirectories will be scanned for `collection.json` files).

```
metablock compile --help
```
