import React, { useState, ChangeEvent, useEffect } from "react";
import { DateTimePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { TextField, Button } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ToastContainer, toast } from "react-toastify";

import { Wrapper } from "./Filters.styles";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../reducers";
import { fetchLogs } from "../actions";

// TODO: Form
// TODO: Fix date pickers throwing findDOMNode is deprecated in StrictMode error.
// TODO: Add spinner on load and error on error (in another component)

const mapStateToProps = (state: RootState) => ({
  logs: state.logs,
  loading: state.loading,
});

const mapDispatch = {
  fetchLogs: fetchLogs,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const Filters: React.FC<Props> = ({ logs, loading, fetchLogs }) => {
  const [startDate, setStartDate] = useState(new Date("01 Jan 2019"));
  const [endDate, setEndDate] = useState(new Date());
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pageString, setPageString] = useState(`${page}`);

  useEffect(() => {
    getLogs(page);
  }, []);

  const getLogs = async (newPage: number) => {
    if (logs.pages !== 0 && (newPage < 1 || newPage > logs.pages)) {
      toast.error("Incorrect page number");
    } else {
      fetchLogs(startDate, endDate, user, status, newPage);
      if (page !== newPage) {
        setPage(newPage);
        setPageString(`${newPage}`);
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

  const goBack = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      setPageString(`${newPage}`);
      getLogs(newPage);
    }
  };

  const goForward = () => {
    if (page < logs.pages) {
      const newPage = page + 1;
      setPage(newPage);
      setPageString(`${newPage}`);
      getLogs(newPage);
    }
  };

  const handlePageNumberChange = (
    newPage: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageString(newPage.target.value);
  };

  const handleSetPage = () => {
    let newPage = /^[-+]?(\d+|Infinity)$/.test(pageString)
      ? Number(pageString)
      : NaN;

    if (isNaN(newPage)) {
      setPageString(`${page}`);
      toast.error("Incorrect page number");
      return;
    }

    newPage = newPage < 1 ? 1 : newPage;
    newPage = newPage > logs.pages ? logs.pages : newPage;

    setPage(newPage);
    setPageString(`${newPage}`);
    getLogs(newPage);
  };

  // Datepicker throws an error when changing month for some reason.
  return (
    <>
      <Wrapper>
        <div className="panel">
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
            <TextField
              label="Użytkownik"
              onChange={handleUserChange}
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  getLogs(1);
                }
              }}
            />

            <TextField
              label="Status"
              onChange={handleStatusChange}
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  getLogs(1);
                }
              }}
            />
          </div>

          <div className="column">
            <Button
              variant="contained"
              color="primary"
              onClick={() => getLogs(1)}
            >
              Znajdź
            </Button>
          </div>
        </div>
        <div className="panel">
          {logs.pages > 0 && (
            <div className="column">
              <div className="change-page-buttons">
                <TextField
                  className="page-field"
                  label="Strona"
                  value={pageString}
                  onChange={handlePageNumberChange}
                  onKeyPress={(ev) => {
                    if (ev.key === "Enter") {
                      handleSetPage();
                    }
                  }}
                />{" "}
                z {logs.pages}
                <Button
                  className="page-arrow"
                  variant="contained"
                  color="primary"
                  disabled={loading || page <= 1}
                  onClick={goBack}
                >
                  <ArrowBackIosIcon />
                </Button>
                <Button
                  className="page-arrow"
                  variant="contained"
                  color="primary"
                  disabled={loading || page >= logs.pages}
                  onClick={goForward}
                >
                  <ArrowForwardIosIcon />
                </Button>
              </div>
            </div>
          )}
        </div>
      </Wrapper>
      <ToastContainer />
    </>
  );
};

export default connector(Filters);
