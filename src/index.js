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
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

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
// import { createMuiTheme, ThemeProvider } from '@material-ui/core';
const CustomizedTheme = createMuiTheme({
  ...theme,
  palette: {
    ...theme.palette,
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
    },
    adminNavbarSearch: { main: "rgba(255, 255, 255, 0.6)" },
    authNavbarLink: {
      main: "rgba(255, 255, 255, 0.65)",
      dark: "rgba(255, 255, 255, 0.95)",
    },
    background: { paper: "#fff", default: "#f8f9fe" },
    black: { light: "#12263F", main: "#000000" },
    buttonLightLabel: { main: "rgba(255, 255, 255, 0.95)" },
    common: { black: "#000", white: "#fff" },
    contrastThreshold: 3,
    dark: {
      tableBorder: "#1f3a68",
      tableHeadColor: "#4d7bca",
      tableHeadBgColor: "#1c345d",
      main: "#172b4d",
      dark: "#0b1526",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    error: {
      light: "#f3a4b5",
      main: "#f5365c",
      snackbar: "#f75676",
      badgeBg: "#fdd1da",
      badgeBgHover: "#e30b36",
    },
    // getContrastText: ƒ getContrastText(background),
    gray: {
      100: "#f6f9fc",
      200: "#e9ecef",
      300: "#dee2e6",
      400: "#ced4da",
      500: "#adb5bd",
      600: "#8898aa",
      700: "#7889e8",
      // 700: "#525f7f",
      800: "#32325d",
      900: "#212529",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#d5d5d5",
      A200: "#aaaaaa",
      A400: "#303030",
      A700: "#616161",
    },
    info: {
      main: "#11cdef",
      snackbar: "#37d5f2",
      badgeBg: "#aaedf9",
      badgeBgHover: "#0c9cb7",
      badge: "#03acca",
    },
    primary: {
      main: "#5e72e4",
      dark: "#233dd2",
      snackbar: "#7889e8",
      badgeBg: "#eaecfb",
      badgeBgHover: "#2a44db",
    },
    secondary: {
      main: "#f7fafc",
      snackbar: "#f8fbfc",
      badgeBgHover: "#cadeeb",
      btnOutline: "#4385b1",
      btnActive: "#d2e3ee",
    },
    sidebarLinks: { main: "rgba(0, 0, 0, 0.5)", dark: "rgba(0, 0, 0, 0.9)" },
    success: {
      main: "#2dce89",
      snackbar: "#4fd69c",
      badgeBg: "#b0eed3",
      badgeBgHover: "#229c68",
      badge: "#1aae6f",
    },
    text: {
      primary: "#7889e8",
      // primary: "#525f7f",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
    tonalOffset: 0.2,
    transparent: { main: "transparent" },
    type: "light",
    warning: {
      light: "#ffd600",
      main: "#fb6340",
      snackbar: "#fc7c5f",
      badgeBg: "#fee6e0",
      badgeBgHover: "#f93305",
    },
    white: { main: "#FFFFFF" },
  },
});

document.title = "Time Sheet Managment Tool";
console.log(theme);

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <ThemeProvider theme={CustomizedTheme}>
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
