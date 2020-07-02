import { Notebook } from "../src";

describe("Test MobX stores", () => {
  test("Create notebook", () => {
    const notebook = new Notebook();
    expect(notebook.md).toBeTruthy();
  });
});
