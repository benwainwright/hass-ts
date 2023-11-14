import { RestClient } from "../rest-client/rest-client";
import { GetStatesCommand } from "../websocket-client/messages";
import { GetConfigCommand } from "../websocket-client/messages/get-config-command";
import { GetPanelsCommand } from "../websocket-client/messages/get-panels-command";
import { GetServicesCommand } from "../websocket-client/messages/get-services-command";
import { WebsocketClient } from "../websocket-client/websocket-client";
import { IClient } from "./i-client";
import { CalendarDetails, Config, Event, Panel, Services, State } from "@types";

export class Client implements IClient {
  constructor(
    private websocketClient: WebsocketClient,
    private httpClient: RestClient,
  ) {}

  async getErrorLog(): Promise<string> {
    return await this.httpClient.get("/error_log");
  }

  async getCalendars(): Promise<CalendarDetails> {
    return await this.httpClient.get("/calendars");
  }

  async getConfig(): Promise<Config> {
    const { result } = await this.websocketClient.sendCommand<
      GetConfigCommand,
      Config
    >({
      type: "get_config",
    });
    return result;
  }

  async getServices(): Promise<Services> {
    const { result } = await this.websocketClient.sendCommand<
      GetServicesCommand,
      Services
    >({
      type: "get_services",
    });
    return result;
  }

  async getPanels(): Promise<Record<string, Panel>> {
    const { result } = await this.websocketClient.sendCommand<
      GetPanelsCommand,
      Record<string, Panel>
    >({
      type: "get_panels",
    });
    return result;
  }

  async getStates(): Promise<State[]> {
    const { result } = await this.websocketClient.sendCommand<
      GetStatesCommand,
      State[]
    >({
      type: "get_states",
    });
    return result;
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
}
