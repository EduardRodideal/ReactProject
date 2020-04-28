import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import "./App.scss";
import { ProjectsProvider, SelectedProjectProvider } from "./context";

render(
  <React.StrictMode>
    <SelectedProjectProvider>
      <ProjectsProvider>
        <App />
      </ProjectsProvider>
    </SelectedProjectProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
