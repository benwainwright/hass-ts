import { Command } from "./command.js";

/**
 * Another fake command used for testing
 */
export interface ThrowCommand extends Command {
  type: "throw";
}
