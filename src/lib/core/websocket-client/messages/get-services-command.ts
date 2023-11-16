import { Command } from "./command.js";

export interface GetServicesCommand extends Command {
  type: "get_services";
}
