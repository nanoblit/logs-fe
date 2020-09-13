import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import 'react-toastify/dist/ReactToastify.css';

import { Wrapper } from "./App.styles";
import Filters from "./components/Filters";
import LogsView from "./components/LogsView";

const App: React.FC = () => {

  useEffect(() => {
    const html = document.querySelector("html");
    const body = document.querySelector("body");
    if (body && html) {
      html.style.height = "100%";
      body.style.height = "100%";
    }
  }, []);

  return (
    <Wrapper>
      <CssBaseline />
      <Filters />
      <LogsView />
    </Wrapper>
  );
};

export default App;
