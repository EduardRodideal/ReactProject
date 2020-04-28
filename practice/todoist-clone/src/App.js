import React from "react";
import { Header } from "./components/layout/Header";
import {Content} from "./components/layout/Content";

import "bootstrap/dist/css/bootstrap.min.css";



export const App = () => {
  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  )
}

