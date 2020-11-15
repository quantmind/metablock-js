# Metablock React

React components, views and utilities for building metablocks.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Contents**

- [Components](#components)
  - [NoSsr](#nossr)
  - [Header](#header)
  - [Image](#image)
- [Hooks](#hooks)
  - [useIntersectionObserver](#useintersectionobserver)
  - [useWindowSize](#usewindowsize)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Components

### NoSsr

Disable server-side rendering
```js
import {NoSsr} from "@metablock/react";
<NoSsr>
  ...
</NoSsr>
```
This is useful for private/login-protected pages for example.

### Header

```js
import {Header} from "@metablock/react";
<Header paddingTop={1}, paddingBottom={1}/>
```

### Image

Progressively load background images

## Forms

The library has a tooling for rending Forms specified via a Json schema.

## Hooks

### useIntersectionObserver

Originally from [montezume/medium-style-progressively-loaded-images](https://github.com/montezume/medium-style-progressively-loaded-images) repo.
This hook allows to progressively load images.

### useWindowSize
