import {
  Config,
  Event,
  Panel,
  Services,
  State,
  CalendarDetails,
  ServiceDomainDetails,
} from "@types";
import { EventDetails } from "src/lib/types/event-details";

export interface IClient {
  subscribeToEvents(callback: (message: Event) => void): Promise<void>;

  subscribeToEvents(
    type: string,
    callback: (message: Event) => void,
  ): Promise<void>;

  getStates(): Promise<State[]>;
  getConfig(): Promise<Config>;
  getServices(): Promise<Services>;
  getServiceDomains(): Promise<ServiceDomainDetails[]>;
  getPanels(): Promise<Record<string, Panel>>;
  getCalendars(): Promise<CalendarDetails>;
  getEvents(): Promise<EventDetails[]>;
  getErrorLog(): Promise<string>;
  close(): Promise<void>;
}
