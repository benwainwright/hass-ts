import { Command } from "./command.js";

export interface GetDevicesCommand extends Command {
  type: "config/device_registry/list";
}
