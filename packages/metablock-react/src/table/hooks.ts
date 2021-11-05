import { useRef } from "react";
import { ApiDataGridActions, ApiDataGridActionsRef } from "./types";

export const useDataGridActions = (): [
  ApiDataGridActionsRef,
  (gridActions: ApiDataGridActions) => void
] => {
  const actions = useRef<ApiDataGridActions>();
  const setActions = (gridActions: ApiDataGridActions) => {
    actions.current = gridActions;
  };
  return [actions, setActions];
};
