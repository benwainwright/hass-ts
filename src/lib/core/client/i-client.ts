import {
  Config,
  Event,
  Panel,
  State,
  CalendarDetails,
  ServiceDomainDetails,
  LogBookEntry,
  EventDetails,
  HassArea,
  HassEntity,
  HassDevice,
  Service,
} from "@types";

import { GetHistoryParams } from "./get-history-params.js";
import { GetLogbookParams } from "./get-logbook-params.js";

import {
  CallServiceCommand,
  CallServiceResponse,
} from "@core/websocket-client";

/**
 * The Home Assistant client API. Once initialised, the client will make request via
 * **either** the websocket or HTTP API where appropriate
 *
 * @public
 */
export interface IClient {
  /**
   * Returns an array of state changes from the past
   */
  getHistory(params: GetHistoryParams): Promise<State[][]>;

  /**
   * Gets a list of areas registered with home assistant
   */
  getAreas(): Promise<HassArea[]>;

  /**
   * Gets a list of entries from the Home Assistant logbook
   *
   * @param params - params to filter the results
   */
  getLogbook(params?: GetLogbookParams): Promise<LogBookEntry[]>;

  getEntities(): Promise<HassEntity[]>;

  getDevices(): Promise<HassDevice[]>;

  getStates(): Promise<State[]>;

  getState(entityId: string): Promise<State>;

  /**
   * Call a service action
   *
   * See {@link https://developers.home-assistant.io/docs/api/websocket/#calling-a-service-action}
   *
   * @param params - parameters to send with the service command
   */
  callService(
    params: Omit<CallServiceCommand, "id" | "type">,
  ): Promise<CallServiceResponse>;

  getConfig(): Promise<Config>;

  getServices(): Promise<Record<string, Service>>;

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
