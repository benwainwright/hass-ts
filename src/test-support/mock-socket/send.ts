import { MessageFromServer } from "src/lib/core/websocket-client/messages";
import { Socket } from "./socket";

export const send = <T extends MessageFromServer>(socket: Socket, data: T) => {
  socket.send(JSON.stringify(data));
};
