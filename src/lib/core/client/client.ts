import { HassTsError } from "../errors/hass-ts-error";
import { ERRORS } from "../strings";
import { MessageFromServer } from "../websocket-client";
import { WebsocketClient } from "../websocket-client/websocket-client";
import { IClient } from "./i-client";

export class Client implements IClient {
  constructor(private websocketClient: WebsocketClient) {}

  public async subscribeToEvents(
    callback: (message: MessageFromServer) => void,
  ): Promise<void>;
  public async subscribeToEvents(
    type: string,
    callback: (message: MessageFromServer) => void,
  ): Promise<void>;
  public async subscribeToEvents(
    typeOrCallback: string | ((message: MessageFromServer) => void),
    callbackIfTypeIsSupplied?: (message: MessageFromServer) => void,
  ): Promise<void> {
    /* istanbul ignore next */
    if (
      typeof typeOrCallback === "function" &&
      callbackIfTypeIsSupplied === undefined
    ) {
      this.websocketClient.addMessageListener(typeOrCallback);
      await this.websocketClient.sendCommand({
        type: "subscribe_events",
      });
    } else if (
      typeof callbackIfTypeIsSupplied === "function" &&
      typeof typeOrCallback === "string"
    ) {
      this.websocketClient.addMessageListener(callbackIfTypeIsSupplied);
      await this.websocketClient.sendCommand({
        type: "subscribe_events",
        event_type: typeOrCallback,
      });
    }
  }
}
