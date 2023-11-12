import { PingCommand } from "@core";
import { send } from "./send";
import { Socket } from "./socket";

export const handlePing = (socket: Socket, message: PingCommand) => {
  send(socket, {
    id: message.id,
    type: "result",
    success: true,
    result: {
      message: "ping",
    },
  });
};
