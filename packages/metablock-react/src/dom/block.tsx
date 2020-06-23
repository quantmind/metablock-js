import { Block } from "@metablock/core";
import React from "react";

export const BlockContext = React.createContext({});

export const useBlock = (): Block => {
  const block = React.useContext(BlockContext);
  return block as Block;
};
