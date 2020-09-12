import { getLogger, Logger } from "@metablock/core";
import { Express, Request } from "express";
import onFinished from "on-finished";

const defaultLogData = (req: Request, status: number) => {
  return {
    method: req.method,
    url: req.originalUrl,
    status,
    "user-agent": req.get("user-agent"),
  };
};

export default (app: Express, logger_?: Logger, logData?: any) => {
  const logger: Logger = logger_ || getLogger({ name: "request" });
  logData = logData || defaultLogData;

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
        logger[level](logData(req, status));
    });

    next();
  });
};
