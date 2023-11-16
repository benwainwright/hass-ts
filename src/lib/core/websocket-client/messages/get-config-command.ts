import { Command } from "./command.js";

export interface GetConfigCommand extends Command {
  type: "get_config";
}
