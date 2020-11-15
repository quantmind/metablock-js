# Metablock Stores

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Metablock Stores](#metablock-stores)
  - [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

[Mobx](https://github.com/mobxjs/mobx) stores for metablock API and other sources.

## Common Store

## Cache Store

Cache GET request to remote urls

```javascript
const { cacheStore } = useStores();

const data = await cacheStore.get("https://someurl.com");
```

## References

- [Awesome mobx](https://github.com/mobxjs/awesome-mobx)
- [Real world example](https://github.com/gothinkster/react-mobx-realworld-example-app)
