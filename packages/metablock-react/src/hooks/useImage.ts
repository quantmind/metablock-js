import { useAsync } from "react-use";
import { useStores } from "../store";

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


const useImage = (image: string) => {
  const { photoStore } = useStores();
  const info = imageProvider(image);
  return useAsync(async () => {
    if (info.provider === "unsplash") {
      const r = await photoStore.getPhoto(info.id);
      const d = r.urls;
      return [d.thumb, d.small, d.regular, d.full];
    }
    else return info.urls;
  }, [image]);
};

export default useImage;
