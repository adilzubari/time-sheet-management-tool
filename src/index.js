import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "assets/theme/theme.js";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import ReportViewerLayout from "layouts/ReportViewer.js";
import EmployeeLayout from "layouts/Employee.js";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

// Context API
// import { StateProvider, useStateValue } from "./StateProvider";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";

document.title = "Time Sheet Managment Tool";

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Router>
        <Switch>
          <Route
            path="/viewer"
            render={(props) => <ReportViewerLayout {...props} />}
          />
          <Route
            path="/employee"
            render={(props) => <EmployeeLayout {...props} />}
          />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="/" to="/auth" />
        </Switch>
      </Router>
    </ThemeProvider>
  </StateProvider>,
  document.querySelector("#root")
);
