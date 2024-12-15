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
pc.onicecandidate = () => {
  console.log("candidate\n", JSON.stringify(pc.localDescription));
  window.a = JSON.stringify(pc.localDescription);
};
pc.ondatachannel = (e) => {
  pc.rc = e.channel;
  pc.rc.onopen = () => console.log("Sender opened");
  pc.rc.onmessage = (e) => console.log("message\n" + e.data);
};

const dc = pc.createDataChannel("sender");
dc.onopen = () => console.log("Sender opened");
dc.onmessage = (e) => console.log("message\n" + e.data);

export async function start() {
  try {
    const offer = await pc.createOffer();
    console.log(JSON.stringify(offer));
    await pc.setLocalDescription(offer);
    const answer = prompt("enter receiver json") || "{}";
    await pc.setRemoteDescription(JSON.parse(answer));
    console.log("will send");
  } catch (err) {
    console.error(err);
  }
}

export async function receive() {
  try {
    const offer = prompt("enter senders offer");
    if (offer == null) return;

    await pc.setRemoteDescription(JSON.parse(offer));
    await pc.setLocalDescription(await pc.createAnswer());
    console.log("will receive");
  } catch (err) {
    console.error(err);
  }
}
