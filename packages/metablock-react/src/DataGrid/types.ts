import { MutableRefObject } from "react";

export type Maybe<T> = T | undefined | null;

export interface ApiDataGridActions {
  filter: (key: string, value: any) => Promise<void>;
}

export type ApiDataGridActionsRef = MutableRefObject<ApiDataGridActions | void>;
