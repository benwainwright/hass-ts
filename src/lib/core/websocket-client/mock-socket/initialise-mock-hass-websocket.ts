import { WebSocketServer } from "ws";
import { handleSocketMessage } from "./handle-socket-message";

export const initialiseMockHassWebsocket = (
  port: number,
  token: string,
  version: string,
) => {
  const server = new WebSocketServer({ port });

  server.on("connection", (socket) => {
    socket.send(JSON.stringify({ type: "auth_required", ha_version: version }));
    socket.on("message", (data) => {
      console.log({ data: data.toString("utf-8")});
      handleSocketMessage(socket, data, token, version);
    });
  });
};
