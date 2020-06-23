import bodyParser from "body-parser";
import express from "express";
import settings from "./settings";
import Services from "./services";

export default (services: Services) => {
  const app = express();

  app.use(bodyParser.json());

  app.post("/login", async (req, res) => {
    res.status(404).json({ message: "Not available" });
  });

  app.get("/config", async (req, res) => {
    const ctx: Record<string, any> = await services.getConfig(req);
    res.json({ ...ctx, env: settings });
  });

  app.get("/photo/:photoId", async (req, res) => {
    try {
      const ctx: Record<string, any> = await services.getPhoto(
        req.params.photoId
      );
      delete ctx.related_collections;
      delete ctx.current_user_collections;
      delete ctx.tags;
      res.json(ctx);
    } catch (err) {
      res.json({ error: true });
    }
  });

  return app;
};
