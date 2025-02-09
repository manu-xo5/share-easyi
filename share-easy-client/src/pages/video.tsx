import React, { useState } from "react";
import { join, send, createRoom, pc } from "../lib/peer";
import { api } from "../lib/api";
import { useNavigate } from "react-router";

function Button({ style, children, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      style={{
        ...style,
        padding: "5px 20px",
        background: "linear-gradient(180deg, blue, royalblue)",
        border: "none",
        borderRadius: "5px",
        color: "white",
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export const Video: React.FC = () => {
  const [selfPin, setSelfPin] = useState("");
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: "20px",
        display: "grid",
        gap: "10px",
      }}
    >
      <p>{selfPin ? "Your pin: " + selfPin : "Loading"}</p>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <Button
          onClick={async () => {
            const offer = await createRoom("create");
            if (!offer) return;
            const { pin } = await api.postPeer(offer);

            setSelfPin(pin);
            alert("Your Room id: " + pin);
            const receiverPin = prompt("Enter receiver's pin");
            if (!receiverPin) return;

            const { offer: answer } = await api.getPeer({ pin: receiverPin });
            if (receiverPin) join(answer);

            function gotoChatRoom() {
              send("hello");
              navigate("/chat-room");
              pc.rc.removeEventListener("open", gotoChatRoom);
            }

            pc.rc.addEventListener("open", gotoChatRoom);
          }}
        >
          Create
        </Button>

        <Button
          onClick={async () => {
            const senderPin = prompt("Enter senders pin");
            if (senderPin == null) return;

            const { offer } = await api.getPeer({ pin: senderPin });

            const answer = await join(offer);
            if (!answer) return;

            const { pin } = await api.postPeer(answer);
            alert("Your pin is: " + pin);
            navigate("/chat-room");
          }}
        >
          Join Room
        </Button>
      </div>
    </div>
  );
};
