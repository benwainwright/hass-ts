import { Command } from "./command";

export interface GetPanelsCommand extends Command {
  type: "get_panels";
}