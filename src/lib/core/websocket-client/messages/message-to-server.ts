import { AuthRequiredMessageResponse } from "./auth";
import { PingCommand } from "./ping-pong";

export type MessageToServer = AuthRequiredMessageResponse | PingCommand;
