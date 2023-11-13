import { Command } from "./command";

export interface GetConfigCommand extends Command {
  type: "get_config";
}
