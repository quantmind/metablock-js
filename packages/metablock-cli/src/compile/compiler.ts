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

const getCompiler = (fileName: string) => {
  const type = mime.lookup(fileName);
  return type ? contentCompilers[type] : null;
};

export default getCompiler;
