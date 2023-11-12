import { ThrowCommand } from ".";
import { AuthRequiredMessageResponse } from "./auth";
import { PingCommand } from "./ping-pong";
import { SubscribeToEventsMessage } from "./subscribe-to-events";

export type MessageToServer =
  | AuthRequiredMessageResponse
  | PingCommand
  | SubscribeToEventsMessage
  | ThrowCommand;
