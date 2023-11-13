import { Event, State } from "@types";

export interface IClient {
  subscribeToEvents(callback: (message: Event) => void): Promise<void>;

  subscribeToEvents(
    type: string,
    callback: (message: Event) => void,
  ): Promise<void>;

  getStates(): Promise<State[]>;
}
