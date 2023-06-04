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

The `compile` command scans a repository for directories containing the `collection.json` file and

- Compile Markdown files into JSON data files and compile minimal requirement javascript files for inclusion in [@metablock/notebooks](../metablock-notebook)
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

For help on usage:

```
metablock compile --help
```

### Parameters

- **content**: if `true` the directory is considered a content directory and its files/sub-folders will be used to build JSON data files and sitemaps. If it is not `true` the directory won't be considered as content (however, subdirectories will be scanned for `collection.json` files).
- **slug**: defines how the relative path of an entry is constructed
- **outDir**: this is really needed only by the top level `collection.json` file to point where compiled files should be saved
- **paginate**: if set to `true` a pagination index data file is created (this is useful for markdown data files). To exclude a markdown file from pagination you can add the `pagination: false` header


### Content

The content can be either a markdown file `my-content.md` or a directory with multiple files. It the content is a directory, these rules must be followed

* There must be n `index.md` file, if not provided, the compiler will log a warning and skip the directory
* Nested content directories are not supported, and the compiler will skip them


### Markdown headers

Markdown files can have headers used to build the JSON data files. Headers are defined at the top of the file
and can have the following entries:

```
title: My Title
date: 2023-01-07
author: John Doe
description: This is a description
category: general, news
image: /path/to/image or unspash-<image-id>
private: false
---
```

The three dashes **---** mark the end of the header.

Headers are optional and these are the default values and behavior:

* `private` (default is `false`). If `true` the file is not included in the JSON pagination file nor the sitemap. The file
  is still compiled and visible during development only.
