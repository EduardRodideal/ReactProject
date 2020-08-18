import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";


//Components
import { LeftAndRight } from "./components/material-components/general/LeftAndRight";
import { Navbar } from "./components/material-components/Navbar";

//Pages
import Signup from "./components/material-components/pages/signup";
import Login from "./components/material-components/pages/login";

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className="container1">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/agenda" component={LeftAndRight} />     
            <Route path="/signup" component={Signup} />      
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
