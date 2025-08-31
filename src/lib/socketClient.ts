import io, { Socket } from "socket.io-client";
let socket: Socket | null = null;

export function getSocket(forceNew: boolean = false): Socket {
  if (socket && !forceNew) return socket;
  if (socket) {
    closeSocket();
  }
  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    transports: ["websocket"],
  });

  socket.on("connect_error", (err) => {
    console.warn("socket connect_error", err);
  });

  return socket;
}

export function closeSocket() {
  if (socket) {
    try {
      socket.disconnect();
    } catch (e) {
      // ignore
    }
    socket = null;
  }
}
