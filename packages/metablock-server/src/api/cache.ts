import { Express, Request } from "express";
import Services from "../services";
import safe from "./safe";

export default (app: Express, services: Services) => {
  app.get(
    "/cache/:key",
    safe(async (req: Request) => {
      return await services.cli.get(
        `${services.blockUrl}/.api/cache/${req.params.key}`
      );
    })
  );

  app.put(
    "/cache/:key",
    safe(async (req: Request) => {
      const { body } = req;
      return await services.cli.put(
        `${services.blockUrl}/.api/cache/${req.params.key}`,
        { body }
      );
    })
  );
};
