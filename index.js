const path = require("path");
const { Socket } = require("socket.io");
const Express = require("express");
const cors = require("cors");

const PORT = 5000;
const app = Express();

/** @type {Map<Socket, { id: string; address: string }>} */
let conns = new Map();

app.use(
  cors({
    origin: "/",
  })
);
app.use("/", Express.static(path.join(__dirname, "/dist")));

const server = app.listen(PORT, () => console.log(`HTTP listening on ${PORT}`));

const io = require("socket.io")(server, {
  cors: { origin: "*" },
  path: "/io",
});

io.on("connection", (socket) => {
  const address = socket.handshake.address;
  console.log(`SOCKETIO: ${socket.id} connected`);

  socket.on("join", (id) => {
    conns.set(socket, { id, address });

    io.emit("remote-users", getMapValues(conns, address));
  });

  socket.on("disconnect", () => {
    conns.delete(socket);
    console.log(`SOCKETIO: ${socket.id} disconnected`);
    io.emit("remote-users", getMapValues(conns, address));
  });
});

/**
 *
 * @param {Map<Socket, { id: string; address: string }>} map
 * @param {string} clientAddress
 * @returns
 */
function getMapValues(map, clientAddress) {
  return Array.from(map.values())
    .filter((oConn) => isOnSameNetwork(oConn.address, clientAddress))
    .filter((oConn) => Boolean(oConn.id))
    .map((oConn) => oConn.id);
}

/**
 *
 * @param {string} address1
 * @param {string} address2
 */
function isOnSameNetwork(address1, address2) {
  return true;
}
