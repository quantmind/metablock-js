interface UnsplashOptions {
  image?: string;
  collection?: string;
  size?: string;
  search?: string;
}

export default (options: UnsplashOptions): string => {
  const { image, collection, search = "", size = "1600x900" } = options;
  if (image) {
    return `https://source.unsplash.com/${image}/${size}`;
  } else if (collection) {
    return `https://source.unsplash.com/collection/${collection}/${size}`;
  } else {
    return `https://source.unsplash.com/${size}?${search}`;
  }
};
