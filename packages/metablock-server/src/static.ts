import express, { Express, Request } from "express";
import { resolve } from "path";

export default (app: Express, path: string) => {
  let staticDir = path;
  if (staticDir.substring(0, 1) === "/") staticDir = staticDir.substring(1);
  else path = `/${path}`;
  staticDir = resolve(process.cwd(), staticDir);

  app.use(path, express.static(staticDir, { fallthrough: false }));

  app.use((err: any, req: Request, res: any, next: any) => {
    return res.status(404).send("Not Found");
  });
};
