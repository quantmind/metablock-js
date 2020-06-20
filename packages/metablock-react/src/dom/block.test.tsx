import { render, screen } from "@testing-library/react";
import React from "react";
import { BlockContext, useBlock } from "./index";

const Text = () => {
  const b = useBlock();
  return <p>test {b.name}</p>;
};

const Page = () => {
  const config = { name: "hello" };
  return (
    <BlockContext.Provider value={config}>
      <div>
        <Text />
      </div>
    </BlockContext.Provider>
  );
};

test("Meta context", () => {
  render(<Page />);
  expect(screen.getByText("test hello")).toBeInTheDocument();
});
