import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

export interface DataGridFilters {
  readonly filters: Record<string, any>;
  set: (key: string, value: any) => void;
  setSome: (someFilters: Record<string, any>) => void;
  setAll: (filters: Record<string, any>) => void;
}

export const useDataGridFilters = (
  useUrl?: boolean,
  initial?: Record<string, any>
): DataGridFilters => {
  const [searchParams, setSearchParams] = useSearchParams(initial || {});
  const [simpleParams, setSimpleParams] = useState<any>(initial || {});

  const currentFilters = useUrl
    ? Object.fromEntries(searchParams)
    : simpleParams;

  class DataGridFiltersInner implements DataGridFilters {
    get filters() {
      return currentFilters;
    }

    set(key: string, value: any) {
      const newFilters = { ...currentFilters, [key]: value };
      if (value === "") delete newFilters[key];
      this.setAll(newFilters);
    }

    setSome(someFilters: Record<string, any>) {
      const newFilters = { ...currentFilters, ...someFilters };
      this.setAll(newFilters);
    }

    setAll(newFilters: Record<string, any>) {
      useUrl ? setSearchParams(newFilters) : setSimpleParams(newFilters);
    }
  }

  return new DataGridFiltersInner();
};
