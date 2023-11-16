import { Socket } from "./socket.js";
import { mockEventData } from "../../lib/core/client/mock-event-data.js";
import { send } from "./send.js";
import { SubscribeToEventsMessage } from "@core";
import { delay } from "../delay.js";

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
