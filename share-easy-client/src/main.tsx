import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "../styles/global.css";
import About from "./pages/about";
import { Video } from "./pages/video";
import { ChatRoom } from "./pages/chat-room";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/about" element={<About />} />

        <Route path="/video" element={<App />} />

        <Route path="/chat-room" element={<ChatRoom />} />

        <Route path="/*" element={<Video />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
