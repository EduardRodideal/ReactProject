import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { RoomContextProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <RoomContextProvider>
      <Router>
        <App />
      </Router>
    </RoomContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
