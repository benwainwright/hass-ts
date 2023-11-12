import { ThrowCommand } from "@core";
import { Socket } from "./socket";
import { send } from "./send";
import { ErrorResult } from "src/lib/core/websocket-client/messages/error-result";
import { TEST_ERROR_CODE, TEST_ERROR_MESSAGE } from "../test-values";

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
