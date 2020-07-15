import btoa from "btoa";
import { Request } from "express";
import { Context } from "../interfaces";

export default (ctx: Context, req?: Request) => {
  // const csrfToken = req.csrfToken();
  //const init = JSON.stringify({ ...web, csrfToken });
  const init = JSON.stringify(ctx.web);
  const title = ctx.web.title || ctx.web.name;
  const description = ctx.web.description || title;
  const scripts = [
    `<script type="application/javascript">__bundle_url__="${ctx.web.deployUrl}/";</script>`,
  ].concat(
    ctx.html.scripts.map((script) => `<script src="${script}"></script>`)
  );
  const head = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    ...ctx.html.head,
    ...ctx.html.meta,
    ...ctx.html.css,
    `<meta name="mb:state" content="${btoa(init)}">`,
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
