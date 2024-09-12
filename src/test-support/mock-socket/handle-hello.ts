import { HelloCommand } from "@core";
import { send } from "./send.js";
import { Socket } from "./socket.js";

export const handleHello = (socket: Socket, message: HelloCommand) => {
  send(socket, {
    id: message.id,
    type: "result",
    success: true,
    result: {
      message: "hey!",
    },
  });
};
