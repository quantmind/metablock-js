import mime from "mime-types";
import compileFile, { copyFile } from "./file";

mime.types["svelte"] = "application/svelte";

export const contentCompilers: Record<string, any> = {
  "text/markdown": compileFile,
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
