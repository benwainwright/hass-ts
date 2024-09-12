import { Command } from "./command.js";

export interface SubscribeToEventsMessage extends Command {
  type: "subscribe_events";
  event_type?: string;
}
