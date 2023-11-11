import { safeJsonParse } from "@utils";
import { MessageToServer } from "../messages/message-to-server";
import { handleAuth } from "./handle-auth";
import { handlePing } from "./handle-ping";
import { Socket } from "./socket";

export const handleSocketMessage = (
  socket: Socket,
  data: Buffer | ArrayBuffer | Buffer[],
  token: string,
  version: string,
) => {
  if (!(data instanceof Buffer)) {
    return;
  }
  const text = data.toString("utf-8");

  const message = safeJsonParse<MessageToServer>(text);

  switch (message.type) {
    case "auth":
      handleAuth(socket, message, token, version);
      break;

    case "ping":
      handlePing(socket, message);
      break;
  }
};
