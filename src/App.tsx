import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Wrapper } from "./App.styles";
import Filters from "./components/Filters";

const App: React.FC = () => {
  return (
    <Wrapper>
      <CssBaseline />
      <Filters />
    </Wrapper>
  );
};

export default App;
