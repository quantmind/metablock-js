import debug from "debug";
// todo: adding properties to a map is a slopery slope and should be avoided. Not very 'TypeScripty', refactor when possible.

interface Config extends ConfigBase {
  name: string;
}

interface ConfigBase {
  color: number;
  level: number;
}

interface Level extends Map<LevelName, Config> {
  add: (name: LevelName, config: ConfigBase) => Level;
}

const level_names = ["debug", "info", "warning", "error", "critical"] as const;

type LevelName = typeof level_names[number];

const levels = new Map() as Level;

levels.add = function (name, configBase) {
  const config = {
    name,
    ...configBase,
  };
  this.set(name, config);
  return this;
};

levels
  .add("debug", {
    color: 81,
    level: 10,
  })
  .add("info", {
    color: 76,
    level: 20,
  })
  .add("warning", {
    color: 149,
    level: 30,
  })
  .add("error", {
    color: 161,
    level: 40,
  })
  .add("critical", {
    color: 38,
    level: 50,
  });

export default (name: LevelName | string, level?: LevelName | string) => {
  const levelConfig =
    levels.get(level as LevelName) || (levels.get("info") as Config);

  const logger: { [key: string]: debug.Debugger } = {};
  let db;

  levels.forEach((l) => {
    db = debug(`${name} - ${l.name} -`);
    db.color = String(l.color);
    db.enabled = l.level >= levelConfig.level;
    logger[l.name] = db;
  });

  return logger as { [key in LevelName]: debug.Debugger };
};
