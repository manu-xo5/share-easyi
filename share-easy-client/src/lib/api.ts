//const BASE_URL = "//localhost:5000";
const BASE_URL = "https://fine-cod-12.deno.dev";

const fetcho = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
  window.fetch(BASE_URL + input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

export const api = {
  async postPeer(payload: { sdp?: string; type: string }): Promise<{
    pin: string;
  }> {
    const res = await fetcho("/peer", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return await res.json();
  },

  async getPeer(payload: { pin: string }): Promise<{
    offer: { sdp?: string; type: "answer" | "offer" };
  }> {
    const res = await fetcho(`/peer?pin=${payload.pin}`, {
      method: "GET",
    });
    return await res.json();
  },
};
