import { ThrowCommand } from "./throw-command.js";
import { AuthRequiredMessageResponse } from "./auth.js";
import { GetStatesCommand } from "./get-states-comand.js";
import { HelloCommand } from "./hello.js";
import { SubscribeToEventsMessage } from "./subscribe-to-events.js";
import { GetConfigCommand } from "./get-config-command.js";
import { GetPanelsCommand } from "./get-panels-command.js";
import { GetServicesCommand } from "./get-services-command.js";

export type MessageToServer =
  | AuthRequiredMessageResponse
  | HelloCommand
  | SubscribeToEventsMessage
  | ThrowCommand
  | GetStatesCommand
  | GetConfigCommand
  | GetPanelsCommand
  | GetServicesCommand;
