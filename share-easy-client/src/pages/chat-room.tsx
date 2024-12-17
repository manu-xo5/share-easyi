import * as React from "react";
import { pc, send } from "../lib/peer";

export const ChatRoom: React.FC = () => {
  const [messages, setMessages] = React.useState<string[]>([]);

  React.useEffect(() => {
    function handleMessage(e: MessageEvent<any>) {
      console.log(e.data);
      if (typeof e.data !== "string") {
        const blob = new Blob([e.data]);
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "file";
        a.click();

        URL.revokeObjectURL(a.href);
        a.remove();
        return;
      }
      setMessages((p) => [...p, e.data]);
    }

    pc.rc.addEventListener("message", handleMessage);
    return () => pc.rc.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div>
      <ul>
        {messages.map((text) => (
          <li>{text}</li>
        ))}
      </ul>
      <input
        placeholder="enter your message"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            send(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
      <button
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.click();

          input.onchange = () => {
            const file = input.files?.item(0);
            console.log(file);
            if (file) send(file);
          };
        }}
      >
        Send File
      </button>
    </div>
  );
};
