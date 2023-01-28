import mime from "mime-types";
import copyFile from "./file";
import compileMarkdown from "./md";

mime.types["svelte"] = "application/svelte";

const contentCompilers: Record<string, any> = {
  "text/markdown": compileMarkdown,
};

export const contentType = (fileName: string): any => {
  return mime.lookup(fileName);
};

const getCompiler = (fileName: string) => {
  const type = contentType(fileName);
  return contentCompilers[type] || copyFile;
};

export default getCompiler;
