import { mockEventData } from "@core/client";
import { delay } from "@test-support";

import { Socket } from "./socket.js";
import { send } from "./send.js";
import { SubscribeToEventsMessage } from "@core";

export const handleSubscribe = async (
  socket: Socket,
  message: SubscribeToEventsMessage,
) => {
  send(socket, {
    id: message.id,
    type: "result",
    success: true,
    result: null,
  });

  const ONE_SECOND = 1000;

  await delay(2 * ONE_SECOND);

  send(socket, { id: message.id, type: "event", event: mockEventData });
};
