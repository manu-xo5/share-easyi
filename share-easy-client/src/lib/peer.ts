import { sleep } from "./utils";

declare global {
  interface RTCPeerConnection {
    rc: RTCDataChannel;
  }

  interface Window {
    a: string;
  }

  const a: string;
}

const pc = new RTCPeerConnection();
let offer: RTCSessionDescription | null = null;
pc.onicecandidate = () => {
  console.log("candidate\n", JSON.stringify(pc.localDescription));
  window.a = JSON.stringify(pc.localDescription);
  offer = pc.localDescription;
};
pc.ondatachannel = (e) => {
  pc.rc = e.channel;
  pc.rc.onopen = () => console.log("Sender opened");
  pc.rc.onmessage = (e) => console.log("message\n" + e.data);
};

const dc = pc.createDataChannel("sender");
dc.onopen = () => console.log("Sender opened");
dc.onmessage = (e) => console.log("message\n" + e.data);

export async function createRoom(type: "create" | "join") {
  try {
    if (type === "create") {
      await pc.setLocalDescription(await pc.createOffer());
    } else {
      await pc.setLocalDescription(await pc.createAnswer());
    }
    await sleep(2_000);
    return offer;
  } catch (err) {
    console.error(err);
  }
}

export async function join(answer: { sdp?: string; type: "answer" | "offer" }) {
  if (answer.type === "offer") {
    await pc.setRemoteDescription(answer);
    await pc.setLocalDescription(await pc.createAnswer());
    await sleep(2_000);
    return offer;
  } else {
    await pc.setRemoteDescription(answer);
    return null;
  }
}

export async function send(message: string | Blob) {
  dc.send(message as string);
}

export { pc };
