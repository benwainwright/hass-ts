import { ThrowCommand } from ".";
import { AuthRequiredMessageResponse } from "./auth";
import { HelloCommand } from "./hello";
import { SubscribeToEventsMessage } from "./subscribe-to-events";

export type MessageToServer =
  | AuthRequiredMessageResponse
  | HelloCommand
  | SubscribeToEventsMessage
  | ThrowCommand;
