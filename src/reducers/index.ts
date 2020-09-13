import { combineReducers } from "redux";

import {
  SetLogsAction,
  LogsState,
  SET_LOGS,
  SET_LOADING,
  SET_ERROR,
  LoadingState,
  SetErrorAction,
  ErrorState,
  SetLoadingAction,
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

export const loadingReducer = (
  state = false,
  action: SetLoadingAction
): LoadingState => {
  switch (action.type) {
    case SET_LOADING:
      return action.loading;
    default:
      return state;
  }
};

const initialErrorState: ErrorState = {
  error: null
}

export const errorReducer = (
  state = initialErrorState,
  action: SetErrorAction
): ErrorState => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  logs: logsReducer,
  loading: loadingReducer,
  error: errorReducer
});

export type RootState = ReturnType<typeof rootReducer>;
