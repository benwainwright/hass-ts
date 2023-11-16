import { WebSocketServer } from "ws";
import { handleSocketMessage } from "./handle-socket-message.js";
import { send } from "./send.js";

const ONE_SECOND = 1000;

export const initialiseMockHassWebsocket = (
  port: number,
  token: string,
  version: string,
) => {
  const sessionNumber = Math.floor(Math.random() * 1000000);
  const server = new WebSocketServer({ port });

  server.on("connection", (socket) => {
    socket.send(JSON.stringify({ type: "auth_required", ha_version: version }));

    setTimeout(() => {
      send(socket, { type: "test", testMessage: "test" });
    }, 2 * ONE_SECOND);

    setTimeout(() => {
      socket.close();
    }, 5 * ONE_SECOND);

    socket.on("message", (data) => {
      if (data instanceof Buffer) {
        handleSocketMessage(socket, data, token, version, sessionNumber).catch(
          (error) => {
            console.error(error);
          },
        );
      }
    });
  });
  return server;
};
