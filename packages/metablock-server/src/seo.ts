import { Express, Request } from "express";
import { Context } from "./interfaces";

export default (app: Express, services: any) => {
  const serveRobots = async (req: Request, res: any) => {
    const context = await services.getConfig(req);
    res.type("text/plain").send(robots(context));
  };

  app.get("/robots.txt", serveRobots);
};

const robots = (context: Context) => {
  const entries = [];
  entries.push({ UserAgent: "*", Disallow: ["/.api"] });
  return entries.map(userAgent).join("\n\n");
};

const userAgent = (entry: any): string => {
  let data: string[] = [`User-Agent: ${entry.UserAgent}`];
  data = data.concat(
    (entry.Disallow || []).map((d: string) => `Disallow: ${d}`)
  );
  data = data.concat((entry.Sitemap || []).map((d: string) => `Sitemap: ${d}`));
  return data.join("\n");
};
