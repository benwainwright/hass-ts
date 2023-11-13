import { HelloCommand } from "@core";
import { send } from "./send";
import { Socket } from "./socket";

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
