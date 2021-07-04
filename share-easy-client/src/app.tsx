import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import app from "../styles/app.module.css";
import "../styles/progress-bar.css";
import receive from "../styles/receiver.module.css";
import Footer from "./components/Footer";
import Instructions from "./components/instructions";
import Peer from "./peerjs";
import RemoteUser from "./remote-user";

export type filemeta = {
  filename: string;
  filetype: string;
};
type file = {
  type: "BINARY";
  file: ArrayBuffer;
} & filemeta;

type willReceive = {
  type: "WILL_RECEIVE";
} & filemeta;

function App() {
  const [remotes, setRemotes] = useState<string[]>([]);
  const [peer, setPeer] = useState<Peer>();
  const [socket, setSocket] = useState<ReturnType<typeof io>>();
  const [received, setReceived] = useState<filemeta[]>([]);

  useEffect(() => {
    const myPeer = new Peer(undefined, {
      host: "0.peerjs.com",
    });

    myPeer.on("open", () => {
      setPeer(myPeer);
      // successfully connects to server
      const mySocket = io("/", {
        path: "/io",
      });
      mySocket.on("connect", () => {
        setSocket(mySocket);
        mySocket.emit("join", myPeer.id);
      });

      // receive live updates on remote-users
      mySocket.on("remote-users", (users: string[]) => {
        setRemotes(users.filter((userId) => userId !== myPeer.id));
      });
    });
    // remote calls us
    myPeer.on("connection", (conn) => {
      conn.on("data", (data: file | willReceive) => {
        switch (data.type) {
          case "BINARY": {
            const a = document.createElement("a");
            const file = data.file;
            const blob = new Blob([file], { type: data.filetype });
            const url = URL.createObjectURL(blob);

            a.href = url;
            a.download = data.filename;
            a.click();
            break;
          }

          case "WILL_RECEIVE": {
            const { type: _, ...filemeta } = data;
            setReceived((prev) => [...prev, filemeta]);
            break;
          }
        }
      });
    });

    // remove connection when dev server remounts without reloading
    function handleDisconnect() {
      if (socket == null || myPeer == null) return;
      socket.disconnect();
      myPeer.disconnect();
      console.log({
        socket,
        myPeer,
      });

      window.onbeforeunload = handleDisconnect;
      return handleDisconnect;
    }
  }, []);

  function handleFilesChange(peerId: string, files: FileList | null) {
    if (!(peer && files && files.length !== 0)) return;
    const conn = peer.connect(peerId);

    // when connects successfully
    conn.on("open", () => {
      Array.from(files).forEach((file) => {
        const blob = new Blob([file], { type: file.type });

        conn.send({
          type: "WILL_RECEIVE",
          filename: file.name,
          filetype: file.type,
        });

        conn.send({
          type: "BINARY",
          file: blob,
          filename: file.name,
          filetype: file.type,
        });
      });
    });
  }

  // return loader when useEffect haven't called setPeer() or Fails to
  if (!peer?.id) {
    return <h1>Initializing</h1>;
  }

  return (
    <>
      {" "}
      <main className="container">
        <h1 className="hero">Share Easy</h1>

        <h2 className="title"> Remote Users </h2>
        <ul>
          {remotes.map((peerId) => (
            <li key={peerId}>
              <RemoteUser
                peerId={peerId}
                onFilesChange={(files) => handleFilesChange(peerId, files)}
              />
            </li>
          ))}
        </ul>

        <section className={receive.filesContainer}>
          <p className={receive.filesListTitle}>Received Files:</p>
          <ul className={receive.fileList}>
            {received.map((filesMeta) => (
              <li className={receive.fileItem}>{filesMeta.filename}</li>
            ))}
          </ul>
        </section>

        <p
          className={app.localPeerId}
          data-tooltip="click to copy"
          onClick={() => navigator.clipboard.writeText(peer.id)}
        >
          Your Id: {peer.id}
        </p>

        <Instructions />
      </main>
      <Footer />
    </>
  );
}

export default App;
