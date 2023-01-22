import { Notebook } from "../src";

describe("Test editor", () => {
  test("Create editor", async () => {
    const notebook = new Notebook();
    expect(notebook.editor).toBeTruthy();
    //const fake = sinon.fake();
    //notebook.loadStyle = async (stylesheet) => fake(stylesheet);
    //const el = document.createElement("div");
    //await notebook.edit("# Test markdown", el, { mode: "markdown" });
    //sinon.assert.callCount(fake, 2);
  });
});
