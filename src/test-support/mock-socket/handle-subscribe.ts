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

  await delay(200);

  socket.send(JSON.stringify(mockEventData(message.id)));
};
