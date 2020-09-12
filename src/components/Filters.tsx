import React, { useState, ChangeEvent, useEffect } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { TextField, Button } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { Wrapper } from "./Filters.styles";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../reducers";
import { fetchLogs } from "../actions";

// TODO: Form
// TODO: Fix date pickers throwing findDOMNode is deprecated in StrictMode error.
// TODO: Add spinner on load and error on error (in another component)

const mapStateToProps = (state: RootState) => ({
  logs: state.logs,
  dataStatus: state.status,
});

const mapDispatch = {
  fetchLogs: fetchLogs,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const Filters: React.FC<Props> = ({ logs, dataStatus, fetchLogs }) => {
  const [startDate, setStartDate] = useState(new Date("01 Jan 2015"));
  const [endDate, setEndDate] = useState(new Date());
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getLogs();
  }, []);

  useEffect(() => {
    console.log(logs);
    console.log(dataStatus);
  }, [dataStatus]);

  const getLogs = async () => {
    if (logs.pages !== 0 && (page < 1 || page > logs.pages)) {
      // TODO: Handle incorrect page error with toaster
      console.error("Incorrect page");
    } else {
      fetchLogs(startDate, endDate, user, status, page);
    }
  };

  const handleStartDateChange = (newDate?: MaterialUiPickersDate) => {
    if (newDate) {
      setStartDate(newDate.toDate());
    }
  };

  const handleEndDateChange = (newDate?: MaterialUiPickersDate) => {
    if (newDate) {
      setEndDate(newDate.toDate());
    }
  };

  const handleUserChange = (newUser: ChangeEvent<HTMLInputElement>) => {
    setUser(newUser.target.value);
  };

  const handleStatusChange = (newStatus: ChangeEvent<HTMLInputElement>) => {
    setStatus(newStatus.target.value);
  };

  const handlePageNumberChange = (
    newPage: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPage(parseInt(newPage.target.value, 10));
  };

  return (
    <Wrapper>
      <div className="column">
        <KeyboardDatePicker
          format="DD/MM/yyyy"
          margin="normal"
          label="Data od"
          value={startDate}
          onChange={handleStartDateChange}
        />

        <KeyboardDatePicker
          format="DD/MM/yyyy"
          margin="normal"
          label="Data do"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>

      <div className="column">
        <TextField label="Użytkownik" onChange={handleUserChange} />

        <TextField label="Status" onChange={handleStatusChange} />
      </div>

      <div className="column">
        <Button variant="contained" color="primary" onClick={getLogs}>
          Znajdź
        </Button>
      </div>
      {logs.data.length > 0 && (
        <div className="column">
          <TextField
            className="page-field"
            label="Strona"
            value={page}
            onChange={handlePageNumberChange}
          />
          <div>
            z {logs.pages}{" "}
            <Button
              className="page-arrow"
              variant="contained"
              color="primary"
              onClick={getLogs}
            >
              <ArrowForwardIosIcon />
            </Button>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default connector(Filters);
