import { ThunkAction } from "redux-thunk";
import axios from "axios";

import {
  SetLogsAction,
  SET_LOGS,
  LogsState,
  SetLoadingAction,
  SET_LOADING,
  SetErrorAction,
  SetFinishedAction,
  SET_ERROR,
  SET_FINISHED,
} from "./types";
import { RootState } from "../reducers";
import { Action } from "redux";

const setLogs = (logs: LogsState): SetLogsAction => {
  return {
    type: SET_LOGS,
    payload: logs,
  };
};

const setLoading = (): SetLoadingAction => {
  return {
    type: SET_LOADING,
    payload: {
      loading: true,
      error: null,
    },
  };
};

const setError = (error: string): SetErrorAction => {
  return {
    type: SET_ERROR,
    payload: {
      loading: true,
      error: error,
    },
  };
};

const setFinished = (): SetFinishedAction => {
  return {
    type: SET_FINISHED,
    payload: {
      loading: false,
      error: null,
    },
  };
};

export const fetchLogs = (
  startDate: Date,
  endDate: Date,
  user: string,
  status: string,
  page: number
): ThunkAction<void, RootState, unknown, Action<any>> => async (dispatch) => {
  try {
    dispatch(setLoading());

    const logs: LogsState = (
      await axios.post("http://localhost:5000/", {
        data: { startDate, endDate, user, status, page },
      })
    ).data;

    dispatch(setLogs(logs));
  } catch (err) {
    dispatch(setError(err.response.data));
  }
  dispatch(setFinished());
};
