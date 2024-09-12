import {
  Config,
  Event,
  Panel,
  Services,
  State,
  CalendarDetails,
  ServiceDomainDetails,
  LogBookEntry,
  EventDetails,
  HassArea,
} from "@types";

import { GetHistoryParams } from "./get-history-params.js";
import { GetLogbookParams } from "./get-logbook-params.js";

import {
  CallServiceCommand,
  CallServiceResponse,
} from "@core/websocket-client";

/**
 * The Home Assistant client API. Uses a combination of both the websocket and HTTP apis
 *
 * @alpha
 */
export interface IClient {
  /**
   * Returns an array of state changes from the past
   */
  getHistory(params: GetHistoryParams): Promise<State[][]>;

  getAreas(): Promise<HassArea[]>;

  getLogbook(params?: GetLogbookParams): Promise<LogBookEntry[]>;

  getStates(): Promise<State[]>;

  getState(entityId: string): Promise<State>;

  /**
   * Call a service action
   *
   * See https://developers.home-assistant.io/docs/api/websocket/#calling-a-service-action
   *
   * @param params - parameters to send with the service command
   */
  callService(
    params: Omit<CallServiceCommand, "id" | "type">,
  ): Promise<CallServiceResponse>;

  getConfig(): Promise<Config>;

  getServices(): Promise<Services>;

  getServiceDomains(): Promise<ServiceDomainDetails[]>;

  getPanels(): Promise<Record<string, Panel>>;

  getCalendars(): Promise<CalendarDetails>;

  getEvents(): Promise<EventDetails[]>;

  getErrorLog(): Promise<string>;

  subscribeToEvents(callback: (message: Event) => void): Promise<void>;

  subscribeToEvents(
    type: string,
    callback: (message: Event) => void,
  ): Promise<void>;

  close(): Promise<void>;
}
