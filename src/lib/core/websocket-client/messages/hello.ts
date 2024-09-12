import { Command } from "./command.js";

/**
 * Not a real command, but used to test the connection to the server.
 */
export interface HelloCommand extends Command {
  type: "hello";
}
