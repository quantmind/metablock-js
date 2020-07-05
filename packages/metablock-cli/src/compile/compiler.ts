import mime from "mime-types";
import copyFile from "./file";
import compileMarkdown from "./md";

mime.types["svelte"] = "application/svelte";

export const contentCompilers: Record<string, any> = {
  "text/markdown": compileMarkdown,
  "text/html": copyFile,
  "text/plain": copyFile,
  "application/javascript": copyFile,
  "application/svelte": copyFile,
};

export const contentType = (fileName: string): any => {
  return mime.lookup(fileName);
};

const getCompiler = (fileName: string) => {
  const type = contentType(fileName);
  return contentCompilers[type];
};

export default getCompiler;
