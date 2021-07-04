import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "../styles/global.css";
import About from "./pages/about";
import { Outlet, Route } from "./module/router";
import Page404 from "./pages/page-404";

ReactDOM.render(
  <React.StrictMode>
    <Route path="/about">
      <About />
    </Route>

    <Route exact path="/">
      <App />
    </Route>

    <Route path=".*">
      <Page404 />
    </Route>

    <Outlet />
  </React.StrictMode>,
  document.getElementById("root")
);
