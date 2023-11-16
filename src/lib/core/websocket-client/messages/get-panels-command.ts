import { Command } from "./command.js";

export interface GetPanelsCommand extends Command {
  type: "get_panels";
}
