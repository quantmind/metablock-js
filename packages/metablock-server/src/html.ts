import btoa from "btoa";
import { Express, Request } from "express";
import mime from "mime-types";
import { Context } from "./interfaces";
import Services from "./services";

export default (app: Express, services: Services) => {
  const serve_html = async (req: Request, res: any, next: any) => {
    if (isHtml(req)) {
      const context = await services.getConfig(req);
      res.send(rawHtml(context));
    } else {
      next();
    }
  };

  app.get("*", serve_html);
};

export const isHtml = (req: Request): boolean => {
  if (req.accepts("text/html")) {
    const type = mime.lookup(req.path);
    return type === false || type === "text/html";
  }
  return false;
};

export const rawHtml = (ctx: Context) => {
  const init = JSON.stringify(ctx.web);
  const scripts = [
    `<script type="application/javascript">__metablock_assets_url__="${ctx.web.assetsUrl}/";</script>`,
  ].concat(
    ctx.html.scripts.map((script) => `<script src="${script}"></script>`)
  );
  const head = ctx.html.meta
    .concat([`<meta name="mb:state" content="${btoa(init)}">`])
    .concat(ctx.html.css);
  const afterBody = scripts.concat(ctx.html.afterBody);

  return `<!doctype html>
<html lang="en">
<head>
  ${head.join("\n")}
</head>
<body>
  <div id="__metablock"></div>
</body>
${afterBody.join("\n")}
</html>`;
};
