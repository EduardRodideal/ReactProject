import React from "react";
import { Header } from "./components/layout/Header";
import {Content} from "./components/layout/Content";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


export const App = () => (
  <div className="container-fluid">
    <Header />
    <Content />
  </div>
);
