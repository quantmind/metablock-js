import { getBlock } from "@metablock/core";
import { createStores } from "@metablock/store";
import React from "react";

const block = getBlock();
export const StoreContext = React.createContext<Record<string, any>>(
  createStores(block.apiUrl, block.name)
);

export const useStores = () => React.useContext(StoreContext);
