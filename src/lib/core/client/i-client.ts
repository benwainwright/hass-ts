import {
  Config,
  Event,
  Panel,
  Services,
  State,
  CalendarDetails,
  ServiceDomainDetails,
  LogBookEntry,
} from "@types";
import { EventDetails } from "src/lib/types/event-details";
import { GetHistoryParams } from "./get-history-params";
import { GetLogbookParams } from "./get-logbook-params";

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
