import { getLogger, Logger } from "@metablock/core";
import { Express } from "express";
import onFinished from "on-finished";

export default (app: Express, logger_?: Logger) => {
  const logger: Logger = logger_ || getLogger({ name: "request" });

  // record response start
  app.use((req: any, res, next) => {
    // log when response finished
    onFinished(res, function () {
      const status = res.statusCode;
      let level = "info";
      if (status == 404) level = "warn";
      else if (status >= 400) level = "error";

      if (logger.isLevelEnabled(level) && !req.logged)
        // @ts-ignore
        logger[level]({
          method: req.method,
          url: req.originalUrl,
          status,
          "user-agent": req.get("user-agent"),
        });
    });

    next();
  });
};
