import { Command } from "./command";

/**
 * Another fake command used for testing
 */
export interface ThrowCommand extends Command {
  type: "throw";
}
