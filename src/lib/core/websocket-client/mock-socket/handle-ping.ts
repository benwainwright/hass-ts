import { PingCommand } from "../messages/ping-pong";
import { Socket } from "./socket";

export const handlePing = (socket: Socket, message: PingCommand) => {
  socket.send(
    JSON.stringify({
      id: message.id,
      type: "result",
      result: {
        message: "ping",
      },
    }),
  );
};
