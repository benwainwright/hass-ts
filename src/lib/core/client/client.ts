import { EventDetails } from "src/lib/types/event-details";
import { RestClient } from "../rest-client/rest-client";
import { GetStatesCommand } from "../websocket-client/messages";
import { GetConfigCommand } from "../websocket-client/messages/get-config-command";
import { GetPanelsCommand } from "../websocket-client/messages/get-panels-command";
import { GetServicesCommand } from "../websocket-client/messages/get-services-command";
import { WebsocketClient } from "../websocket-client/websocket-client";
import { convertCamelCaseToUnderscoreCase } from "@utils";
import { IClient } from "./i-client";
import {
  CalendarDetails,
  Config,
  Event,
  LogBookEntry,
  Panel,
  ServiceDomainDetails,
  Services,
  State,
} from "@types";
import { GetHistoryParams } from "./get-history-params";
import { GetLogbookParams } from "./get-logbook-params";

export class Client implements IClient {
  constructor(
    private websocketClient: WebsocketClient,
    private httpClient: RestClient,
  ) {}

  public async getLogbook(
    params: GetLogbookParams = {},
  ): Promise<LogBookEntry[]> {
    const { timestamp, ...queryParams } = params;

    const queryString = Object.entries(queryParams)
      .map(
        ([key, value]) =>
          `${convertCamelCaseToUnderscoreCase(key)}=${
            value instanceof Date ? value.toISOString() : String(value)
          }`,
      )
      .join("&");
    const timestampString = timestamp ? `/${timestamp.toISOString()}` : "";
    const finalQueryString = queryString ? `?${queryString}` : "";

    const path = `/logbook${timestampString}${finalQueryString}`;

    return await this.httpClient.get(path);
  }

  // TODO need a return type that takes into account the nuances of the params
  public async getHistory(params: GetHistoryParams): Promise<State[][]> {
    const { timestamp, ...queryParams } = params;

    const queryString = Object.entries(queryParams)
      .map(
        ([key, value]) =>
          `${convertCamelCaseToUnderscoreCase(key)}=${String(value)}`,
      )
      .join("&");

    const timestampString = timestamp ? `/${timestamp.toISOString()}` : "";

    const path = `/history/period${timestampString}?${queryString}`;

    return await this.httpClient.get(path);
  }

  public async getEvents(): Promise<EventDetails[]> {
    return await this.httpClient.get("/events");
  }

  public async getErrorLog(): Promise<string> {
    return await this.httpClient.get("/error_log");
  }

  public async getCalendars(): Promise<CalendarDetails> {
    return await this.httpClient.get("/calendars");
  }

  public async getConfig(): Promise<Config> {
    const { result } = await this.websocketClient.sendCommand<
      GetConfigCommand,
      Config
    >({
      type: "get_config",
    });
    return result;
  }

  public async getServiceDomains(): Promise<ServiceDomainDetails[]> {
    return await this.httpClient.get("/services");
  }

  public async getServices(): Promise<Services> {
    const { result } = await this.websocketClient.sendCommand<
      GetServicesCommand,
      Services
    >({
      type: "get_services",
    });
    return result;
  }

  public async getPanels(): Promise<Record<string, Panel>> {
    const { result } = await this.websocketClient.sendCommand<
      GetPanelsCommand,
      Record<string, Panel>
    >({
      type: "get_panels",
    });
    return result;
  }

  public async getStates(): Promise<State[]> {
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
        callback(message.event);
      }
    });
  }

  public async close(): Promise<void> {
    await this.websocketClient.close();
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
