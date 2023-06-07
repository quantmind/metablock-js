import { Metablock } from "@metablock/core";
import { useAsync } from "react-use";

const imageProvider = (image: string, defaultUnsplash?: string) => {
  if (image) {
    const bits = image.split("-");
    if (bits[0] === "unsplash")
      return { provider: "unsplash", id: bits.slice(1).join("-") };
    else return { urls: [image, image, image, image] };
  } else if (defaultUnsplash) {
    return { provider: "unsplash", id: defaultUnsplash };
  } else return {};
};

const useImage = (image: string, metablock?: Metablock) => {
  const cli = metablock || new Metablock();
  const info = imageProvider(image);
  return useAsync(async () => {
    if (info.provider === "unsplash") {
      const r = await cli.photos.getPhoto(info.id);
      const d = r.urls;
      return [d.thumb, d.small, d.regular, d.full];
    } else return info.urls;
  }, [image]);
};

export default useImage;
