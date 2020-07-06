import { Request } from "express";
import mime from "mime-types";

export default (req: Request): boolean => {
  if (req.accepts("text/html")) {
    const type = mime.lookup(req.path);
    return type === false;
  }
  return false;
};
