import { ThrowCommand } from "./throw-command";
import { AuthRequiredMessageResponse } from "./auth";
import { GetStatesCommand } from "./get-states-comand";
import { HelloCommand } from "./hello";
import { SubscribeToEventsMessage } from "./subscribe-to-events";
import { GetConfigCommand } from "./get-config-command";
import { GetPanelsCommand } from "./get-panels-command";
import { GetServicesCommand } from "./get-services-command";

export type MessageToServer =
  | AuthRequiredMessageResponse
  | HelloCommand
  | SubscribeToEventsMessage
  | ThrowCommand
  | GetStatesCommand
  | GetConfigCommand
  | GetPanelsCommand
  | GetServicesCommand;
