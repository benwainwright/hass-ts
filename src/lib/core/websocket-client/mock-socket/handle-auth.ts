import { AuthRequiredMessageResponse } from "../messages/auth";
import { Socket } from "./socket";

export const handleAuth = (
  socket: Socket,
  message: AuthRequiredMessageResponse,
  token: string,
  version: string,
) => {
  if (message.access_token === token) {
    socket.send(
      JSON.stringify({
        type: "auth_ok",
        ha_version: version,
      }),
    );
  } else {
    socket.send(
      JSON.stringify({
        type: "auth_invalid",
        message: "invalid password",
      }),
    );
    socket.close();
  }
};
