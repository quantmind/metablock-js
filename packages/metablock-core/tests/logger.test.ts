import { SinonSpy, spy } from "sinon";
import { getLogger, logLevels } from "../src";

describe("Test logger", () => {
  const logger = getLogger();
  let mocks: Record<string, SinonSpy>;

  beforeEach(() => {
    mocks = Object.keys(logLevels).reduce((o: any, level: string) => {
      // @ts-ignore
      if (console[level]) o[level] = spy(console, level);
      return o;
    }, {});
  });

  afterEach(() => {
    Object.keys(mocks).forEach((m) => mocks[m].restore());
  });

  test("info logger", () => {
    expect(logger.isLevelEnabled("info")).toBeTruthy();
    expect(logger.isLevelEnabled("debug")).toBeFalsy();
    logger.debug("test");
    expect(mocks.debug.notCalled);
  });

  test("warn logger", () => {
    const log = getLogger({ level: "warn" });
    expect(log.isLevelEnabled("warn")).toBeTruthy();
    expect(log.levelNumber).toBe(30);
    expect(log.isLevelEnabled("info")).toBeFalsy();
    log.info("test");
    expect(mocks.info.notCalled);
  });

  test("child", () => {
    const child = logger.child("test");
    child.info("this is a test");
    expect(mocks.info.calledOnce);
  });
});
