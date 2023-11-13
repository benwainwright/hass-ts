import { Command } from "./command";

export interface GetServicesCommand extends Command {
  type: "get_services";
}
