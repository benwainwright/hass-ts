import { MessageFromServer } from "@core";
import { Socket } from "./socket.js";

export const send = <T extends MessageFromServer>(socket: Socket, data: T) => {
  socket.send(JSON.stringify(data));
};
