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

- Compile Markdown files into JSON data files and compile minimal requirement javascript files for inclusion in [@metablock/notebooks](https://github.com/quantmind/metablock-js/tree/master/packages/metablock-notebook)
- Build sitemap files

The `collection.json` has the following entries (all optionals with those default values)

```json
{
  "content": false,
  "slug": ["slug"],
  "outDir": "dist",
  "paginate": false
}
```

If `content` is not `true` the directory won't be considered as content (however subdirectories will be scanned for `collection.json` files).
For help on usage:

```
metablock compile --help
```

### Parameters

- **content**: if `true` the directory is considered a content directory and its files/subfolders will be used to build JSON data files and sitemaps.
- **slug**: defines how the relative path of an entry is constructed
- **outDir**: this is really needed only by the top level `collection.json` file to point where compiled files should be saved
- **paginate**: if set to `true` a pagination index data file is created (this is useful for markdown data files)
