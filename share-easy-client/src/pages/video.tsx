import React from "react";
import { receive, start } from "../lib/peer";

export const Video: React.FC = () => {
  return (
    <>
      <button onClick={start}>Send</button>
      <button onClick={receive}>Receive</button>
    </>
  );
};
