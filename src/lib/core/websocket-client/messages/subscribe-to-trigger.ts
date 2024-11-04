import { Command } from "./command.js";

export interface SubscribeToTriggerMessage extends Command {
  type: "subscribe_trigger";
  trigger: Record<string, unknown>;
}
