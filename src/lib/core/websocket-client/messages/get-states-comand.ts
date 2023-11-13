import { Command } from "./command";

export interface GetStatesCommand extends Command {
  type: "get_states";
}
