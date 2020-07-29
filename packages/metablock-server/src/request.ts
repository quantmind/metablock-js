import { getLogger, Logger } from "@metablock/core";
import { Express } from "express";
import onFinished from "on-finished";

export default (app: Express, logger_?: Logger) => {
  const logger: Logger = logger_ || getLogger("request");

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
        logger[level](
          req.method,
          req.originalUrl,
          req.get("user-agent"),
          status
        );
    });

    next();
  });
};
