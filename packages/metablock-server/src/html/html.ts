import btoa from "btoa";
import { Request } from "express";
import { Context } from "../interfaces";

export default (ctx: Context, req: Request) => {
  // const csrfToken = req.csrfToken();
  //const init = JSON.stringify({ ...web, csrfToken });
  const init = JSON.stringify(ctx.web);
  const title = ctx.web.title || ctx.web.name;
  const description = ctx.web.description || title;
  const scripts = [
    `<script type="application/javascript">__metablock_assets_url__="${ctx.web.assetsUrl}/";</script>`,
  ].concat(
    ctx.html.scripts.map((script) => `<script src="${script}"></script>`)
  );
  const head = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    `<meta name="mb:state" content="${btoa(init)}">`,
    ...ctx.html.meta,
    ...ctx.html.css,
  ];
  const afterBody = scripts.concat(ctx.html.afterBody);

  return `<!doctype html>
<html>
<head>
  ${head.join("\n")}
</head>
<body>
  <div id="__metablock"></div>
</body>
${afterBody.join("\n")}
</html>`;
};
