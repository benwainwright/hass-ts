import { Command } from "./command.js";

export interface GetAreasCommand extends Command {
  type: "config/area_registry/list";
}
