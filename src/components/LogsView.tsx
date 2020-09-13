import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import { format as formatDate } from "date-fns";
import XMLViewer from "react-xml-viewer";
import { ToastContainer, toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

import { RootState } from "../reducers";
import { Wrapper } from "./LogsView.styles";
import { Log } from "../models/Log";

const mapStateToProps = (state: RootState) => ({
  logs: state.logs,
  loading: state.loading,
  error: state.error,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const LogsView: React.FC<Props> = ({ logs, loading, error }) => {
  const [inputs, setInputs] = useState("");
  const [outputs, setOutputs] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setInputs("");
    setOutputs("");
    setSelected("");
  }, [logs]);

  useEffect(() => {
    if (error.error) {
      toast.error(error.error);
    }
  }, [error]);

  const handleRowClick = (log: Log) => {
    setSelected(log.Id);
    setInputs(log.Inputs);
    setOutputs(log.Outputs);
  };

  return (
    <Wrapper isLoading={loading}>
      {loading && (
        <div className="loader">
          <ClipLoader />
        </div>
      )}
      {logs.pages > 0 && !loading && (
        <TableContainer className="table" component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="head" align="center">
                  Użytkownik
                </TableCell>
                <TableCell className="head" align="center">
                  Domena
                </TableCell>
                <TableCell className="head" align="center">
                  Magazyn
                </TableCell>
                <TableCell className="head" align="center">
                  Operation Name
                </TableCell>
                <TableCell className="head" align="center">
                  Operation Status
                </TableCell>
                <TableCell className="head" align="center">
                  Operation Category
                </TableCell>
                <TableCell className="head" align="center">
                  Exception Type
                </TableCell>
                <TableCell className="head" align="center">
                  Exception Name
                </TableCell>
                <TableCell className="head" align="center">
                  Start Time
                </TableCell>
                <TableCell className="head" align="center">
                  End Time
                </TableCell>
                <TableCell className="head" align="center">
                  Dureation Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.data.map((data) => (
                <TableRow
                  className="row"
                  key={data.Id}
                  selected={data.Id === selected}
                  onClick={() => handleRowClick(data)}
                >
                  <TableCell align="center">{data.MobileUserId}</TableCell>
                  <TableCell align="center">{data.MobileDomain}</TableCell>
                  <TableCell align="center">{data.Branch}</TableCell>
                  <TableCell align="center">{data.OperationName}</TableCell>
                  <TableCell align="center">{data.Status}</TableCell>
                  <TableCell align="center">{data.Category}</TableCell>
                  <TableCell align="center">{data.ExceptionType}</TableCell>
                  <TableCell align="center">{data.ExceptionName}</TableCell>
                  <TableCell align="center">
                    {formatDate(new Date(data.StartTime), "dd/MM/yy hh:mm:ss")}
                  </TableCell>
                  <TableCell align="center">
                    {formatDate(new Date(data.EndTime), "dd/MM/yy hh:mm:ss")}
                  </TableCell>
                  <TableCell align="center">{data.Duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {(inputs || outputs) && !loading && (
        <div className="cards">
          <Card className="card">
            <CardHeader title="INPUT XML" />
            <CardContent className="card-content">
              {inputs && <XMLViewer xml={inputs} />}
            </CardContent>
          </Card>
          <Card className="card">
            <CardHeader title="OUTPUT XML" />
            <CardContent className="card-content">
              {outputs && <XMLViewer xml={outputs} />}
            </CardContent>
          </Card>
        </div>
      )}
      <ToastContainer />
    </Wrapper>
  );
};

export default connector(LogsView);
