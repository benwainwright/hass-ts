import { GetStatesCommand } from "../websocket-client/messages";
import { WebsocketClient } from "../websocket-client/websocket-client";
import { IClient } from "./i-client";
import { Event, State } from "@types";

export class Client implements IClient {
  constructor(private websocketClient: WebsocketClient) {}

  async getStates(): Promise<State[]> {
    const { result } = await this.websocketClient.sendCommand<
      GetStatesCommand,
      State[]
    >({
      type: "get_states",
    });
    return result;
  }

  private getTypeAndCallback(
    typeOrCallback: string | ((message: Event) => void),
    callbackIfTypeIsSupplied?: (message: Event) => void,
  ) {
    /* istanbul ignore else -- @preserve */
    if (
      typeof typeOrCallback === "function" &&
      callbackIfTypeIsSupplied === undefined
    ) {
      return { type: undefined, callback: typeOrCallback };
    } else {
      if (
        typeof callbackIfTypeIsSupplied === "function" &&
        typeof typeOrCallback === "string"
      ) {
        return { type: typeOrCallback, callback: callbackIfTypeIsSupplied };
      }
      return { type: undefined, callback: () => {} };
    }
  }

  public async subscribeToEvents(
    callback: (message: Event) => void,
  ): Promise<void>;
  public async subscribeToEvents(
    type: string,
    callback: (message: Event) => void,
  ): Promise<void>;
  public async subscribeToEvents(
    typeOrCallback: string | ((message: Event) => void),
    callbackIfTypeIsSupplied?: (message: Event) => void,
  ): Promise<void> {
    const { type, callback } = this.getTypeAndCallback(
      typeOrCallback,
      callbackIfTypeIsSupplied,
    );

    const typeObj: { event_type: string } | object = type
      ? { event_type: type }
      : {};

    const { id } = await this.websocketClient.sendCommand({
      type: "subscribe_events",
      ...typeObj,
    });

    this.websocketClient.addMessageListener((message) => {
      if (message.type === "event" && message.id === id) {
        message;
        callback(message.event);
      }
    });
  }
}
