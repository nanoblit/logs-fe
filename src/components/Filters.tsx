import React, { useState, ChangeEvent, useEffect } from "react";
import { DateTimePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { TextField, Button } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { ToastContainer, toast } from 'react-toastify';

import { Wrapper } from "./Filters.styles";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../reducers";
import { fetchLogs } from "../actions";

// TODO: Form
// TODO: Fix date pickers throwing findDOMNode is deprecated in StrictMode error.
// TODO: Add spinner on load and error on error (in another component)

const mapStateToProps = (state: RootState) => ({
  logs: state.logs,
});

const mapDispatch = {
  fetchLogs: fetchLogs,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const Filters: React.FC<Props> = ({ logs, fetchLogs }) => {
  const [startDate, setStartDate] = useState(new Date("01 Jan 2019"));
  const [endDate, setEndDate] = useState(new Date());
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getLogs(page);
  }, []);

  const getLogs = async (newPage: number) => {
    if (logs.pages !== 0 && (newPage < 1 || newPage > logs.pages)) {
      toast.error("Incorrect page");
    } else {
      fetchLogs(startDate, endDate, user, status, newPage);
      if (page !== newPage) {
        setPage(newPage);
      }
    }
  };

  const handleStartDateChange = (newDate?: MaterialUiPickersDate) => {
    if (newDate) {
      setStartDate(newDate);
    }
  };

  const handleEndDateChange = (newDate?: MaterialUiPickersDate) => {
    if (newDate) {
      setEndDate(newDate);
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

  // Datepicker throws an error when changing month for some reason.
  return (
    <Wrapper>
      <div className="column">
        <DateTimePicker
          format="yyyy/MM/dd hh:mm"
          margin="normal"
          label="Data od"
          value={startDate}
          onChange={handleStartDateChange}
        />

        <DateTimePicker
          format="yyyy/MM/dd hh:mm"
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
        <Button variant="contained" color="primary" onClick={() => getLogs(1)}>
          Znajdź
        </Button>
      </div>
      {logs.pages > 0 && (
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
              onClick={() => getLogs(page)}
            >
              <ArrowForwardIosIcon />
            </Button>
          </div>
        </div>
      )}
      <ToastContainer />
    </Wrapper>
  );
};

export default connector(Filters);
