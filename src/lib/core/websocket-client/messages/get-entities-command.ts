import { Command } from "./command.js";

export interface GetEntitiesCommand extends Command {
  type: "config/entity_registry/list";
}
