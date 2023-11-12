import { Socket } from "./socket";
import { mockEventData } from "./mock-event-data";
import { send } from "./send";
import { SubscribeToEventsMessage } from "@core";
import { delay } from "@utils";

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
