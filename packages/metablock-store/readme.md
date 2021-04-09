# Metablock Stores

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
