import { Logger } from "@types";

/**
 * @alpha
 */
export interface HassClientConfig {
  host: string;
  port: number;
  token: string;
  logger?: Logger;
}
