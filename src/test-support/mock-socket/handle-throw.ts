import { ThrowCommand } from "@core";
import { Socket } from "./socket.js";
import { send } from "./send.js";
import { ErrorResult } from "src/lib/core/websocket-client/messages/error-result.js";
import { TEST_ERROR_CODE, TEST_ERROR_MESSAGE } from "../test-values.js";

export const handleThrow = (socket: Socket, message: ThrowCommand): void => {
  send<ErrorResult>(socket, {
    id: message.id,
    type: "result",
    success: false,
    error: {
      code: TEST_ERROR_CODE,
      message: TEST_ERROR_MESSAGE,
    },
  });
};
