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
export const SET_ERROR = "SET_ERROR";
export const SET_FINISHED = "SET_FINISHED";

export interface StatusState {
  loading: boolean;
  error: string | null;
}

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: StatusState;
}

export interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: StatusState;
}

export interface SetFinishedAction {
  type: typeof SET_FINISHED;
  payload: StatusState;
}

export type StatusActionTypes = SetLoadingAction | SetErrorAction | SetFinishedAction;
