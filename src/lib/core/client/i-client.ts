import { Config, Event, Panel, Services, State } from "@types";

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
}
