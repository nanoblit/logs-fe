import { ThunkAction } from "redux-thunk";
import axios from "axios";

import {
  SetLogsAction,
  SET_LOGS,
  LogsState,
  SetLoadingAction,
  SET_LOADING,
  SetErrorAction,
  SET_ERROR,
} from "./types";
import { RootState } from "../reducers";
import { Action } from "redux";

const setLogs = (logs: LogsState): SetLogsAction => {
  return {
    type: SET_LOGS,
    payload: logs,
  };
};

const setLoading = (loading: boolean): SetLoadingAction => {
  return {
    type: SET_LOADING,
    loading: loading,
  };
};

const setError = (error: string): SetErrorAction => {
  return {
    type: SET_ERROR,
    payload: { error },
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
    dispatch(setLoading(true));

    const logs: LogsState = (
      await axios.post("http://localhost:5000/", {
        data: { startDate, endDate, user, status, page },
      })
    ).data;

    dispatch(setLogs(logs));
  } catch (err) {
    dispatch(setError(err.response.data));
  }
  dispatch(setLoading(false));
};
