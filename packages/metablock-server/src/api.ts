import { urlQuery } from "@metablock/core";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import Services from "./services";

type Handler = (req: Request, res: Response) => Promise<void>;

export class ApiError {
  status: number;
  data: Record<string, any>;

  constructor(status: number, data: Record<string, any>) {
    this.status = status;
    this.data = data;
  }
}

export default (services: Services) => {
  const app = express();

  app.use(bodyParser.json());

  app.post(
    "/login",
    safe(async (req: Request) => {
      const { body } = req;
      return await services.cli.post(`${services.blockUrl}/.api/login`, {
        body,
      });
    })
  );

  app.get("/integration/urls", async (req: Request, res) => {
    const response = await services.cli.get(
      urlQuery(`${services.blockUrl}/.api/integration/urls`, req.query)
    );
    res.json(response.data);
  });

  app.get("/config", async (req, res) => {
    const ctx: Record<string, any> = await services.getConfig(req);
    res.json({ ...ctx, env: { blockUrl: services.blockUrl } });
  });

  app.get(
    "/photo/:photoId",
    safe(async (req: Request) => {
      return await services.getPhoto(req.params.photoId);
    })
  );

  return app;
};

const safe = (executor: any): Handler => {
  return async (req: express.Request, res: express.Response) => {
    let response;
    try {
      response = await executor(req, res);
    } catch (exc) {
      response = exc;
    }
    res.status(response.status).json(response.data);
  };
};
