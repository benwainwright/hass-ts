import { Command } from "./command";

/**
 * Not a real command, but used to test the connection to the server.
 */
export interface PingCommand extends Command {
  type: "ping";
}
