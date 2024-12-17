import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "../styles/global.css";
import About from "./pages/about";
import { Outlet, Route } from "./module/router";
import Page404 from "./pages/page-404";
import { Video } from "./pages/video";
import { ChatRoom } from "./pages/chat-room";

ReactDOM.render(
  <React.StrictMode>
    <Route path="/about">
      <About />
    </Route>

    <Route exact path="/">
      <Video />
    </Route>

    <Route exact path="/video">
      <App />
    </Route>
    <Route exact path="/chat-room">
      <ChatRoom />
    </Route>

    <Route path=".*">
      <Page404 />
    </Route>

    <Outlet />
  </React.StrictMode>,
  document.getElementById("root")
);
