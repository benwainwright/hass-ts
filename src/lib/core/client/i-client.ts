import { Config, Event, Panel, Services, State, CalendarDetails } from "@types";
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
  getPanels(): Promise<Record<string, Panel>>;
  getCalendars(): Promise<CalendarDetails>;
  getEvents(): Promise<EventDetails[]>;
  getErrorLog(): Promise<string>;
}
