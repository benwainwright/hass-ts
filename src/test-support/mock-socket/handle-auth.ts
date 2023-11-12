import { AuthRequiredMessageResponse } from "@core";
import { send } from "./send";
import { Socket } from "./socket";

const authedSessions: number[] = [];

export const handleAuth = (
  socket: Socket,
  message: AuthRequiredMessageResponse,
  token: string,
  version: string,
  sessionNumber: number,
) => {
  if (
    message.access_token === token &&
    !authedSessions.includes(sessionNumber)
  ) {
    send(socket, {
      type: "auth_ok",
      ha_version: version,
    });
    authedSessions.push(sessionNumber);
  } else {
    send(socket, {
      type: "auth_invalid",
      message: "invalid password",
    });
    socket.close();
  }
};
