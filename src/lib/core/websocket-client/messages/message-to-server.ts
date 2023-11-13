import { ThrowCommand } from "./throw-command";
import { AuthRequiredMessageResponse } from "./auth";
import { GetStatesCommand } from "./get-states-comand";
import { HelloCommand } from "./hello";
import { SubscribeToEventsMessage } from "./subscribe-to-events";

export type MessageToServer =
  | AuthRequiredMessageResponse
  | HelloCommand
  | SubscribeToEventsMessage
  | ThrowCommand
  | GetStatesCommand;
