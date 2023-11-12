import { safeJsonParse } from "@utils";
import { handleAuth } from "./handle-auth";
import { handleHello } from "./handle-ping";
import { Socket } from "./socket";
import { handleSubscribe } from "./handle-subscribe";
import { MessageToServer } from "@core";
import { handleThrow } from "./handle-throw";

export const handleSocketMessage = async (
  socket: Socket,
  data: Buffer | ArrayBuffer | Buffer[],
  token: string,
  version: string,
  sessionNumber: number,
) => {
  if (!(data instanceof Buffer)) {
    return;
  }
  const text = data.toString("utf-8");

  const message = safeJsonParse<MessageToServer>(text);

  switch (message.type) {
    case "auth":
      handleAuth(socket, message, token, version, sessionNumber);
      break;

    case "hello":
      handleHello(socket, message);
      break;

    case "subscribe_events":
      await handleSubscribe(socket, message);
      break;

    case "throw":
      handleThrow(socket, message);
  }
};
