import { combineReducers } from "redux";

import {
  SetLogsAction,
  LogsState,
  SET_LOGS,
  StatusState,
  StatusActionTypes,
  SET_LOADING,
  SET_ERROR,
  SET_FINISHED,
} from "../actions/types";

const initialLogsState: LogsState = {
  data: [],
  pages: 0,
};

export const logsReducer = (
  state = initialLogsState,
  action: SetLogsAction
): LogsState => {
  switch (action.type) {
    case SET_LOGS:
      return action.payload;
    default:
      return state;
  }
};

const initialStatusState: StatusState = {
  loading: false,
  error: null,
};

export const statusReducer = (
  state = initialStatusState,
  action: StatusActionTypes
): StatusState => {
  switch (action.type) {
    case SET_LOADING:
    case SET_FINISHED:
      return { ...state, loading: action.payload.loading };
    case SET_ERROR:
      return action.payload;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  logs: logsReducer,
  status: statusReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
