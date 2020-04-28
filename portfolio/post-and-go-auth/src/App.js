import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//Components
import { LeftAndRight } from "./components/material-components/general/LeftAndRight";
import { Navbar } from "./components/material-components/Navbar";

//Pages
import { Home } from "./components/material-components/pages/home";
import { Signup } from "./components/material-components/pages/signup";
import Login from "./components/material-components/pages/login";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className="container1">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/agenda" component={LeftAndRight} />
            <LeftAndRight />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
