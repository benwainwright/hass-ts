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
} from "@types";

import { GetHistoryParams } from "./get-history-params.js";
import { GetLogbookParams } from "./get-logbook-params.js";

/**
 * The Home Assistant client API. Implements both the websocket and REST APIs
 *
 * @alpha
 */
export interface IClient {
  /**
   * Returns an array of state changes from the past
   */
  getHistory(params: GetHistoryParams): Promise<State[][]>;

  getLogbook(params?: GetLogbookParams): Promise<LogBookEntry[]>;

  getStates(): Promise<State[]>;

  getState(entityId: string): Promise<State>;

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
