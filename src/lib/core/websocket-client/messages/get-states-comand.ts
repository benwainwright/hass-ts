import { Command } from "./command.js";

export interface GetStatesCommand extends Command {
  type: "get_states";
}
