import { Log } from "../models/Log";

export const SET_LOGS = "SET_LOGS";

export interface LogsState {
  data: Log[];
  pages: number;
}

export interface SetLogsAction {
  type: typeof SET_LOGS;
  payload: LogsState;
}

export const SET_LOADING = "SET_LOADING";
export const SET_FINISHED_LOADING = "SET_FINISHED_LOADING";

export type LoadingState = boolean;
export interface ErrorState {
  error: string | null;
}

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  loading: LoadingState;
}

export const SET_ERROR = "SET_ERROR";

export interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: ErrorState;
}
