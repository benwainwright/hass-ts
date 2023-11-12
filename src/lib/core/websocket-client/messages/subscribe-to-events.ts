import { Command } from "./command";

export interface SubscribeToEventsMessage extends Command {
  type: "subscribe_events";
  event_type?: string;
}
