export interface LoggerOptions {
  name?: string;
  level?: string;
}

export const logLevels: Record<string, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  fatal: 50,
};

const defaultLogger = (options?: LoggerOptions) => {
  options = options || {};
  const loggerName = options.name || "";
  const loggerLevel = options.level || "info";
  const levelNumber = logLevels[loggerLevel] || logLevels.info;
  return {
    levelNumber,
    debug(...msg: any) {
      if (levelNumber <= logLevels.debug) console.debug(loggerName, ...msg);
    },
    info(...msg: any) {
      if (levelNumber <= logLevels.info) console.info(loggerName, ...msg);
    },
    warn(...msg: any) {
      if (levelNumber <= logLevels.warn) console.warn(loggerName, ...msg);
    },
    error(...msg: any) {
      if (levelNumber <= logLevels.error) console.error(loggerName, ...msg);
    },
    fatal(...msg: any) {
      if (levelNumber <= logLevels.fatal) console.error(loggerName, ...msg);
    },
    isLevelEnabled(level: string): boolean {
      const num = logLevels[level];
      return num ? num >= levelNumber : false;
    },
    child(config?: any) {
      const { name = "child" } = config || {};
      const newName = loggerName ? `${loggerName}.${name}` : name;
      return logging.loggerFactory({ name: newName });
    },
  };
};

const logging = {
  loggerFactory: defaultLogger,
};

export const setLoggerFactory = (loggerFactory: any) => {
  logging.loggerFactory = loggerFactory;
};

export const getLogger = (options?: any) => {
  return logging.loggerFactory(options);
};

export type Logger = ReturnType<typeof getLogger>;
